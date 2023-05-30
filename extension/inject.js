
let security_theater={}
// the url we check for
security_theater.baseurl="https://cors-anywhere.herokuapp.com/"

security_theater.old_fetch=window.fetch
security_theater.fetch=function(url,opts)
{
	if( (typeof url == "string") && url.startsWith(security_theater.baseurl) ) // we will deal with this
	{
//		console.log("worker_fetch");
		return security_theater.worker_fetch(url.substring(security_theater.baseurl.length),opts)
	}
	else
	{
//		console.log("old_fetch",url);
		return security_theater.old_fetch.call(window,url,opts)
	}
}

security_theater.send=function(msg)
{
	msg=msg || {}
	msg.security_theater=true
	return new Promise((res, rej) => {

		const channel = new MessageChannel()

		channel.port1.onmessage = function(e)
		{
			channel.port1.close()
			if (e.data.error)
			{
				rej(e.data.error)
			}
			else
			{
				res(e.data.result)
			}
		}

		window.postMessage( msg , "*" , [channel.port2] )
	})
}

// run a fetch in our worker
security_theater.worker_fetch=async function(url,opts)
{
	if(opts)
	{
		if(opts.signal){opts.signal=undefined}
	}
//	console.log("worker_fetch: "+url);
	let datauri=await security_theater.send({url:url,opts:opts } )
//	console.log("worker_response: "+datauri);
	return await security_theater.old_fetch.call(window,datauri)
}

// set flag so you can test if this patch is enabled or use it directly
window.security_theater={}
// apply patch
window.fetch=security_theater.fetch
