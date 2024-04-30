
if( window.wrappedJSObject )
{

let security_theater={}
// the url we will check for and replace
security_theater.baseurl="https://cors-anywhere.herokuapp.com/"

security_theater.old_fetch=window.wrappedJSObject.fetch
security_theater.new_fetch=function(url,opts)
{
	if( (typeof url == "string") && url.startsWith(security_theater.baseurl) ) // we will deal with this
	{
		return security_theater.fetch(url.substring(security_theater.baseurl.length),opts)
	}
	else
	{
		return security_theater.old_fetch.call(window,url,opts)
	}
}

security_theater.send=async function(msg)
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
security_theater.fetch=function(url,opts)
{
	return new window.Promise(async function(res, rej){
		if(opts)
		{
			opts=JSON.parse(JSON.stringify(opts))	// remove possible functions that cannot be shared
		}
		let datauri=await security_theater.send({url:url,opts:opts } ) // pass up the chain

		res( await security_theater.old_fetch.call(window,datauri) )// create fake fetch response to a datauri
	})
}

// apply patch
window.wrappedJSObject.fetch=exportFunction(security_theater.new_fetch,window)
window.wrappedJSObject.security_theater_fetch=exportFunction(security_theater.fetch,window)

}

window.addEventListener("message", function(event){
	if( event.data.security_theater )
	{
		try
		{
			(async function(){
				
				let r=await chrome.runtime.sendMessage(event.data)
				event.ports[0].postMessage(r)

			})()
		}
		catch(e)
		{
			event.ports[0].postMessage({error: e})
		}
	}
}, false)

