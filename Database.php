<?php
require ("rb.php");
require ("papercut.php");
R::setup("sqlite:db/database.db");
$ini = parse_ini_file('config.ini');
define('threadCount', $ini['threadCount']);

$global_filename = '';
$global_filepath = '';
class DB
{
	public static function Zip($source, $destination)
	{
		if(!extension_loaded('zip') || !file_exists($source))
		{
			return false;
		}

		$zip = new ZipArchive();
		if(!$zip->open($destination, ZIPARCHIVE::CREATE))
		{
			return false;
		}

		$source = str_replace('\\', '/', realpath($source));

		if(is_dir($source) === true)
		{
			$files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

			foreach($files as $file)
			{
				$file = str_replace('\\', '/', $file);

				if(in_array(substr($file, strrpos($file, '/') + 1), array('.', '..')))
				{
					continue;
				}

				$file = realpath($file);

				if(is_dir($file) === true)
				{
					$zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
				}
				elseif(is_file($file) === true)
				{
					$zip->addFromString(str_replace($source . '/', '', $file), file_get_contents($file));
				}
			}
		}
		elseif(is_file($source) === true)
		{
			$zip->addFromString(basename($source), file_get_contents($source));
		}

		return $zip->close();
	}

	public static function AddJob($filename)
	{
		$w = R::dispense('job');
		$w->name = $filename;
		$t = time();
		$w->timestamp = $t;
		$w->status = R::enum('status:Queued');
		$w->progress = 0;
		$w->is_zipped = 0;
		$id = R::store( $w );
		$bean = R::load('job', $id);
		$bean->filename = $filename;
		http_response_code(200);
		print $bean;
	}

	public static function ListJobs($app)
	{
		$bool = DB::refreshJobs();
		if ($bool[0])
		{
			$app->response()->status(200);
			print json_encode($bool[1]);
		}
		else
		{
			$app->response()->status(400);
			$error = "No jobs in your table";
			print $error;
		}
	}

	public static function StartJob($id, $app)
	{
		$job = R::load('job', $id);
		$path = 'uploads/' . $job['timestamp'] . '/' . $job['name'];
		$newPath = substr($path, 0, -3) . 'stop';
		if ($job->id !== 0)
		{
			if (file_exists($newPath))
			{
				if (unlink($newPath))
				{
					$oldContent = file_get_contents($path);
					$file = fopen($path, 'w');
					if( strpos($oldContent, "&MISC RESTART=.TRUE. /") === false)
					{
						rewind($file);
						if (fwrite($file, "&MISC RESTART=.TRUE. /\n"))
						{
							fwrite($file, $oldContent);
							fclose($file);
							$app->response()->status(200);
							$success = "Job ready for restart.";
							print $success;
						}
						else
						{
							$app->response()->status(400);
							$error = "The .fds file could not be edited.";
							print $error;
						}
					}
					else
					{
						$app->response()->status(200);
						$success = "Job ready for restart.";
						print $success;
					}
				}
				else
				{
					$app->response()->status(400);
					$error = "The .stop file could not be deleted.";
					print $error;
				}
			}
			else
			{
				$app->response()->status(400);
				$error = "The job was never stopped (paused).";
				print $error;
			}
		}
		else
		{
			$app->response()->status(400);
			$error = "The job with ID " . $id . " does not exist.";
			print $error;
		}
	}

	public static function FindJob($id)
	{
		$job = R::load('job', $id);
		print_r(json_decode($job));
	}

	public static function GetJob($id)
	{
		$job = R::load('job', $id);
		return $job;
	}

	public static function DeleteJob($id, $app)
	{
		$job = R::load('job', $id);
		$filename = $job['name'];
		$timestamp = $job['timestamp'];

		//$bool = DB::deleteDir("uploads\\" . $timestamp);
		// if(!$bool)
		// {
		// 	$app->response()->status(400);
		// 	$error = "File {$filename} could not be deleted or was open.";
		// 	return json_encode($error);
		// }
		$result = R::trash('job', $id);
		if ($result)
		{
			$app->response()->status(200);
			$response = "Job {$id} has been deleted.";
			return json_encode($response);
		}
		else
		{
			$app->response()->status(400);
			$error = "Job {$id} could not be deleted or doesn't exist.";
			return json_encode($error);
		}
	}

	/*
	public static function deleteDir($dirPath)
	{
	    if (!is_dir($dirPath))
	    {
	        //throw new InvalidArgumentException("$dirPath must be a directory");
	        return false;
	    }
	    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/')
	    {
	        $dirPath .= '/';
	    }
	    $files = glob($dirPath . '*', GLOB_MARK);
	    foreach ($files as $file)
	    {
	        if (is_dir($file))
	        {
	            self::deleteDir($file);
	        }
	        else
	        {
	            unlink($file);
	        }
	    }
	    rmdir($dirPath);
	    return true;
	}*/

	public static function UpdateStatus($id, $percentage)
	{
		$job = R::load('job', $id);
		if ($percentage >= 100)
		{
			$percentage = 100;
			$job->status = R::enum('status:Completed');
			//DB::zip_file($id);
		}
		else if ($percentage < 100 && $percentage > 0)
		{
			if ($job->status != R::enum('status:Stopped')->id)
			{
				$job->status = R::enum('status:In Progress');
			}
		}
		$job->progress = $percentage;
		R::store($job);
	}

	public static function zip_file($id)
	{
		set_time_limit(0);
		$job = DB::GetJob($id);
		if($job->is_zipped === 0)
		{
			if(!is_writeable("uploads/" . $timestamp)){
				die("Cannot write in the uploads directory.");
			}
			if(!file_exists('archives'))
			{
				mkdir('archives', 0777, true);
			}
			if(!file_exists('archives/' . $timestamp))
			{
				mkdir('archives/' . $timestamp, 0777, true);
			}

			DB::Zip('uploads/' . $timestamp, 'archives/' . $timestamp . '/' . $name . '.zip');
			$job->is_zipped = 1;
		}
	}

	//debug function
	public static function MakeJob($filename)
	{
		$w = R::dispense('job');
		$w->name = $filename;
		$t = time();
		$w->timestamp = $t;
		$w->progress = $percentage;
		$w->status = R::enum('status:Queued');
		$id = R::store($w);
	}

	public static function refreshJobs()
	{
		$jobs = R::find('job');
		if (!count($jobs))
		{
			return array(false);
		}

		$beans = R::exportAll($jobs);
		foreach ($beans as $bean)
		{
			$percentage = pc::getTime($bean["timestamp"] . '/' . substr($bean["name"], 0, strrpos($bean["name"], '.')) . ".out", $bean["id"]);
			if ($percentage != null)
			{
				DB::UpdateStatus($bean["id"], round($percentage, 2));
			}
			else
			{
				DB::UpdateStatus($bean["id"], 0);
			}
		}
		return array(true, $beans);
	}

	public static function queryFiles()
	{
		$toRunJobs = array();

		//refresh jobs
		$result = DB::refreshJobs();

		//check result for true return or false return

		//find out how many are running currently
		$inProgress = R::find('job', ' status_id = ? ', [R::enum('status:In Progress')->id]);
		$count = count($inProgress);
		if ($count < threadCount)
		{

			//query for next jobs
			$jobs = R::find('job', ' status_id = ? ', [R::enum('status:Queued')->id]);

			//forech for each job queued and add them to an array of jobs and add 1 to count
			foreach ($jobs as $job)
			{
				if ($count < threadCount)
				{
					$path = $job["timestamp"] . '/' . $job["name"];
					array_push($toRunJobs, $path);
					$count++;
				}
				else
				{
					break;
				}
			}
			return $toRunJobs;
		}
		else
		{
			return null;
		}
	}

	public static function StopJob($id, $app)
	{
		$job = DB::GetJob($id);
		$filename = $job['name'];
		$timestamp = $job['timestamp'];
		$path = "uploads/" .$timestamp . '/' . substr($filename, 0, strlen($filename)-4);
		$myfile = fopen($path .".stop", "w");
		$job->status = R::enum('status:Stopped');
		R::store($job);
		$app->response(200);

	}
}
?>
