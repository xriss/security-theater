
function blobToBase64(blob) {
	return new Promise((resolve, _) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
}


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		if(request.url)
		{
			(async function(){
				try{
					let opts=request.opts || {}
					const controller = new AbortController()
					const signal = controller.signal
					setTimeout(function(){controller.abort()}, 10*1000)
					opts.signal=signal // timeout
					let r=await fetch( request.url , opts )
					let b=await r.blob()
					let s=await blobToBase64(b)
					sendResponse( { result:s } )
				}catch(e){
					sendResponse( { error:e } )
				}
			})()
			return true
		}
	}
)
