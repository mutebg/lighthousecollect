# Lighthouse Collect ( WIP )

Run Google Lighthouse as a web service, collect audits, create charts, set goals and receive notifications.

[here is UI demo](http://lighthousecollect.westeurope.cloudapp.azure.com:3000/)

<img src="https://raw.githubusercontent.com/mutebg/lighthousecollect/master/docs/list.png" width="350" />
<img src="https://raw.githubusercontent.com/mutebg/lighthousecollect/master/docs/chart.png" width="350" />

## Getting Started

### Requirements

There is docker image, so everything runs inside docker container. The only requirements is to have docker installed.

### Run project

There are 3 environment files (.env.dev .env.local .env.prod )
You need to configure them.

#### Running without docker

You will need local mongodb for that

```
./start.sh local
```

#### Running docker in dev mode

With hot-reloading and nodemon

```
./start.sh dev
```

#### Running docker in dev mode

```
./start.sh prod
```

## How To

In order to use LighthouseCollect you need to make POST request to yourserver.com/api/do

Example payload ( needs application/json header )

```
{
  "project": "github",
  "task": 1
  "urls": [
    {
      "url": "https://github.com/",
      "options": {}
    },{
      "url": "https://github.com/mutebg",
      "options": {
        "lookup": ["Stoyan Delev"]
      }
    }
  ],
  "options": {
    "lookup": [
      "Terms",
      "Privacy"
    ],
    "notifications": {
      "when": "fail",
      "email": "mail@mail.com"
    },
		"goals": {
			"categories": [
				{"name": "SEO", "value": 80},
				{"name": "Performance", "value": 80}
			],
			"audits": [
				{"name": "viewport", "value": 30}
			]
		}
	}
}
```

### Options

* lookup: search for strings inside html
* goal: set your target goals, per category and/or per audit
* notifications: send email notification
  * when: one of always, never, fail, success
  * email: email address
