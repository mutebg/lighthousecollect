# IMPORTANT

* Notifications - send email, configuration for mail server and when and what to send https://nodemailer.com/about/

# NICE TO HAVE

* CLI
* Update Lighthouse to v3
* Add FlowType/TypeScript

## DOCUMENTATION

* Describe config, maybe use JSONSchema for that
* cURL example
* Deploy demo
* Deploy script

### Example config

```
{
  "project": "blaaaa",
  "urls": [
    {
      "url": "https://brandpuntplus.kro-ncrv.nl/brandpuntplus/schuldenkind-jeroen/",
      "options": {
        "lookup": ["homo"]
      }
    }
  ],
  "options": {
    "lookup": [
      "https://twitter.com/Brandpunt_plus",
      "https://www.facebook.com/brandpuntplus/"
    ],
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
