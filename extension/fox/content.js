
window.addEventListener("message", (event) =>
{
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

