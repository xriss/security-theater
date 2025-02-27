

SECURITY THEATER


[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/-E4_9TuE6Ss/0.jpg)](https://www.youtube.com/watch?v=-E4_9TuE6Ss)


[INSTALL ON FIREFOX](blessed/security-theater-1.0.xpi)

You must enable for all sites, ( permissions tab after clicking manage
extension ) or internal CORS will still be blocked for all sites.


SECURITY THEATER


With this plugin installed and enabled any fetch(url) where the url
begins with exactly https://cors-anywhere.herokuapp.com/ will be
handled internally and never reach the
https://cors-anywhere.herokuapp.com/ server. We redirect and satisfy
the request internally.

The response returned in this case is created by fetch(datauri) so is
not 100% transparent, notably the url will of course be wrong but it
should work as a direct replacement unless you are doing something
really strange. The extra options can also not contain any functions
(eg signal:) as functions can not be passed to the context where the
real fetch is happening. But these will just be silently filtered out.

We do this by injecting and monkey patching the fetch function in the
page and then passing the detail onto the worker thread where it can be
processed.

This extension was created so I could create an in browser RSS reader
without needing an external bouncer to fetch the feeds.

https://github.com/xriss/arss

Ideally I would just like for my application to ask the user to disable
some security and then work in a safe and controlled way but browser
makers simply refuse to implement this sort of freadom for political
reasons not security.

Instead we have to do dumb things like this, I miss the old days.

Note the only thing this extension really does is remove the need for a
pointless and wasteful external server by running that server inside
the browser.

FYI for security freaks if you try and restrict the sites this
extension is enabled on then it will fail, it has to be enabled for all
web pages for the internal fetches to not also suffer from CORS
blocking issues.

Instead you can use the internal options to restrict the monkey
patching to only some sites, by default it is all sites.
