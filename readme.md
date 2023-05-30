

SECURITY THEATER


[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/-E4_9TuE6Ss/0.jpg)](https://www.youtube.com/watch?v=-E4_9TuE6Ss)


SECURITY THEATER


With this plugin installed and enabled any fetch(url) where the url 
begins with exactly https://cors-anywhere.eherokuapp.com/ will be 
handled internally and never reach the 
https://cors-anywhere.herokuapp.com/ server.

The response returned in this case is created by fetxh(datauri) so is 
not 100% transparent, noteably the url will of course be wrong but it 
should work in most situations.

We do this by injecting and monkey patching the fetch function in the 
page and then passing the detail onto the worker thread where it can be 
processed.

This plugin was created so I could create an in browser RSS reader 
without needing an external bouncer to fetch the feeds.

https://github.com/xriss/arss

Ideally I would just like for my java script application to disable 
some security and just work in a safe and frendly controlled way. But 
browsers do not allow this for security theater reasons.

Instead we have to do dumb things like this.

Note the only thing this plugin really does is remove the need for a 
pointless and wasteful external server by running that server inside 
the browser.

Sadly if you try and restrict the sites this plugin is enabled on then it 
will fail, it has to be enabled for all web pages for the internal 
fetches to not also suffer from CORS issues.
