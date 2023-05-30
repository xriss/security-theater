
let security_theater={}
// the url we check for
security_theater.baseurl="https://cors-anywhere.herokuapp.com/"

security_theater.old_fetch=window.fetch
security_theater.fetch=function(url,opts)
{
	if( url && url.startsWith(security_theater.baseurl) ) // we will deal with this
	{
		console.log("worker_fetch");
		return security_theater.worker_fetch(url.substring(security_theater.baseurl.length),opts)
	}
	else
	{
		console.log("old_fetch");
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
console.log("got: "+e)
console.log(e.data)
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
	console.log(security_theater.id)
	console.log("worker_fetch: "+url);
	let response=await security_theater.send({greeting: "hello2"})
	console.log("worker_response: "+response);
	console.log(response);
//	const response = await chrome.runtime.sendMessage(security_theater.id,{greeting: "hello"});
//	console.log("response");
//	console.log(response);

//	return await security_theater.old_fetch.call(window,url,opts)
}

// set flag so you can test if this patch is enabled or use it directly
window.security_theater={}
// apply patch
window.fetch=security_theater.fetch
