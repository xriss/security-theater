
console.log("runtime: "+chrome.runtime)

window.addEventListener("message", (event) =>
{
	if( event.data.security_theater )
	{
		try
		{
			(async function(){
				
				let r={"data":"is some data"}
				event.ports[0].postMessage({result: r})

			})()
		}
		catch(e)
		{
			event.ports[0].postMessage({error: e})
		}
	}
}, false)

