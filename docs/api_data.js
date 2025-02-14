define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "fds-online/docs/main.js",
    "group": "c__Program_Files_Ampps_www_fds_online_docs_main_js",
    "groupTitle": "c__Program_Files_Ampps_www_fds_online_docs_main_js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/api/v1/delete/:id",
    "title": "Delete a Job",
    "description": "<p>Deletes the specified job.</p>",
    "group": "delete",
    "name": "DeleteJob",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The ID of the job to delete.</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X DELETE 'http://pyro.demo/api/v1/delete/1'",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "Number",
            "optional": false,
            "field": "response",
            "description": "<p>400</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "response",
            "description": "<p>200</p>"
          }
        ]
      }
    },
    "filename": "fds-online/api.php",
    "groupTitle": "delete"
  },
  {
    "type": "get",
    "url": "/api/v1/download/:id",
    "title": "Download a finished job",
    "description": "<p>Downloads a finished job.</p>",
    "group": "download",
    "name": "DownloadJob",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The ID of the job to download.</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET 'http://pyro.demo/api/v1/download/1'",
        "type": "curl"
      }
    ],
    "filename": "fds-online/api.php",
    "groupTitle": "download"
  },
  {
    "type": "get",
    "url": "/api/v1/jobs/:id",
    "title": "Get Job Status",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique job ID.</p>"
          }
        ]
      }
    },
    "description": "<p>Returns the status of the current job.</p>",
    "group": "jobs",
    "name": "GetJob",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET 'http://pyro.demo/api/v1/jobs/1'",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "Number",
            "optional": false,
            "field": "response",
            "description": "<p>400</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The ID supplied is invalid or does not exist.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of current job.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the uploaded file.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Timestamp of when file was uploaded.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the current job.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "progress",
            "description": "<p>Current progress of the job.</p>"
          }
        ]
      }
    },
    "filename": "fds-online/api.php",
    "groupTitle": "jobs"
  },
  {
    "type": "get",
    "url": "/api/v1/start/:id",
    "title": "Start (Resume) Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique job ID.</p>"
          }
        ]
      }
    },
    "description": "<p>Start (Resume) the job specified.</p>",
    "group": "jobs",
    "name": "StartJob",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET 'http://pyro.demo/api/v1/start/1'",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "Number",
            "optional": false,
            "field": "response",
            "description": "<p>400</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Error message.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of current job.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the current job.</p>"
          }
        ]
      }
    },
    "filename": "fds-online/api.php",
    "groupTitle": "jobs"
  },
  {
    "type": "get",
    "url": "/api/v1/stop/:id",
    "title": "Stop (Pause) Job",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique job ID.</p>"
          }
        ]
      }
    },
    "description": "<p>Stop (Pause) the job specified.</p>",
    "group": "jobs",
    "name": "StopJob",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET 'http://pyro.demo/api/v1/stop/1'",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "Number",
            "optional": false,
            "field": "response",
            "description": "<p>400</p>"
          },
          {
            "group": "400 Bad Request",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The ID supplied is invalid or does not exist.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of current job.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the current job.</p>"
          }
        ]
      }
    },
    "filename": "fds-online/api.php",
    "groupTitle": "jobs"
  },
  {
    "type": "post",
    "url": "/api/v1/jobs",
    "title": "Upload job",
    "description": "<p>Uploads a new job.</p>",
    "group": "jobs",
    "name": "UploadJob",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X POST -F 'file=@example.fds' 'http://pyro.demo/api/v1/jobs'",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The unique job ID.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The job's name.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "timestamp",
            "description": "<p>The timestamp of when the job was uploaded.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "progress",
            "description": "<p>The progress state of the job.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "is_zipped",
            "description": "<p>If the job has been completed and zipped for download.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>The name of the uploaded file.</p>"
          }
        ]
      }
    },
    "filename": "fds-online/api.php",
    "groupTitle": "jobs"
  },
  {
    "type": "get",
    "url": "/api/v1/kill/:id",
    "title": "Kills a job",
    "description": "<p>Kills a currently running job</p>",
    "group": "kill",
    "name": "KillJob",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://pyro.demo/api/v1/kill/1",
        "type": "curl"
      }
    ],
    "filename": "fds-online/api.php",
    "groupTitle": "kill"
  },
  {
    "type": "get",
    "url": "/api/v1/list/",
    "title": "Get All Jobs",
    "description": "<p>Returns a list of running and completed jobs.</p>",
    "group": "list",
    "name": "GetJobs",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X GET 'http://pyro.demo/api/v1/list/'",
        "type": "curl"
      }
    ],
    "error": {
      "fields": {
        "400 Bad Request": [
          {
            "group": "400 Bad Request",
            "type": "Number",
            "optional": false,
            "field": "response",
            "description": "<p>400</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200 OK": [
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "No",
            "description": "<p>jobs in your table if there are no jobs.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The unique job ID.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The job's name.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "timestamp",
            "description": "<p>The timestamp of when the job was uploaded.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "progress",
            "description": "<p>The progress state of the job.</p>"
          },
          {
            "group": "200 OK",
            "type": "Number",
            "optional": false,
            "field": "is_zipped",
            "description": "<p>If the job has been completed and zipped for download.</p>"
          },
          {
            "group": "200 OK",
            "type": "String",
            "optional": false,
            "field": "filename",
            "description": "<p>The name of the uploaded file.</p>"
          }
        ]
      }
    },
    "filename": "fds-online/api.php",
    "groupTitle": "list"
  },
  {
    "type": "get",
    "url": "/api/v1/wipe/",
    "title": "Erases all jobs.",
    "description": "<p>Erases all jobs (Testing purposes only).</p>",
    "group": "wipe",
    "name": "WipeJobs",
    "version": "1.0.0",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl 'http://pyro.demo/api/v1/wipe'",
        "type": "curl"
      }
    ],
    "filename": "fds-online/api.php",
    "groupTitle": "wipe"
  }
] });
