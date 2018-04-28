```
{
  "validators": [],
  "task": null,
  "project": "brandpunt",
  "urls": ["https://brandpuntplus.kro-ncrv.nl/",{
      url: 'http',
      options: {
        lookup: 'look_for_this_text'
      }
  }],
  "outputpath": "",
  "remoteserver": "http://localhost:3000",
  "options": {
    "lookup": [
      "https://twitter.com/Brandpunt_plus",
      "https://www.facebook.com/brandpuntplus/"
    ]
  }
}
```

### Lookup

check for strings in the dom
param: list of strings
example:

```
lookup: ['http://twitter.com/mutebg']
```

### Microdata

check for microdata, rdfa or jsonld
example:

```
microdata: {
  jsonld: ["NewsArticle"]
}
```
