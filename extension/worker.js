
console.log("TEST worker")

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
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");

		console.log(request)
		if(request.url)
		{
			(async function(){
				try{
					let r=await fetch( request.url , request.opts )
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
