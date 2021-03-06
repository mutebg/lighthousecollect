Move to FIREBASE FUNCTIONS
https://cloud.google.com/blog/products/gcp/introducing-headless-chrome-support-in-cloud-functions-and-app-engine

# IMPORTANT



* Notifications - send email, configuration for mail server and when and what to send https://nodemailer.com/about/
* List of all categories and audits
* Implement in production

# NICE TO HAVE

* CLI
* Update Lighthouse to v3
* Add FlowType/TypeScript
* WebPush

## DOCUMENTATION

* Describe config, maybe use JSONSchema for that
* Deploy script

### Example config

```
{
  "project": "skysport",
  "urls": [
    {
      "url": "http://www.skysports.com/football/news"
    }, {
			"url": "http://www.skysports.com/"
		}, {
			"url": "http://www.skysports.com/football/news/11095/11370379/european-paper-talk-barcelona-to-offer-836415m-more-for-antoine-griezmann"
		}
  ],
  "options": {
    "lookup": [
      "https://twitter.com/SkySports",
      "https://www.facebook.com/SkySports"
    ],
		"goal": {
			"categories": [
				{"name": "Progressive Web App", "value": 30},
				{"name": "Performance", "value": 30}
			],
			"audits": [
				{"name": "first-interactive", "value": 20}
			]
		}
	}
}
```
