
console.log("runtime: "+chrome.runtime)

window.addEventListener("message", (event) =>
{
	if( event.data.security_theater )
	{
		try
		{
			(async function(){
				
				let r=await chrome.runtime.sendMessage(event.data)
				console.log("isblob")
				console.log(r)
				event.ports[0].postMessage(r)

			})()
		}
		catch(e)
		{
			event.ports[0].postMessage({error: e})
		}
	}
}, false)

