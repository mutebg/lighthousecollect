# IMPROVEMENTS

* API: slow
* Run in docker: in progress, need more testing
* Production version
* Update Lighthouse
* limits ( per category and per audit )
* Return 400 error when pass the limit

# FEATURES

* Graphs/Charts - https://github.com/terezka/line-charts
* Notifications - send a email on event
* CLI

## DOCUMENTATION

* Describe config, maybe use JSONSchema for that
* cURL example
* Deploy demo

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
		"limits": {
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
