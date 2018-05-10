# Lighthouse Collect

Run Google Lighthouse as a web service, collect audits, set goals and receive notifications.

## Getting Started

### Requirements

There is docker image, so everything runs inside docker container. The only requirements is to have docker installed.

### Run project

Run the project for development

```
docker-compose up --build
```

Run the project for production

```
docker-compose up --file docker-compose.yml --build
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
