
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
					// check sender.origin is allowed in options
					let o=await chrome.storage.sync.get();
					let e=new Error("Origin not allowed in security-theater options")
					if(o.hosts)
					{
						let origin=sender.origin
						for( let line of o.hosts.split("\n") )
						{
//							console.log("CHECK",origin,line)
							line=line.trim()
							if(line!="")
							{
								if( origin.match(line) ) // good origin
								{
//									console.log("MATCH",origin,line)
									e=null
									break
								}
							}
						}
					}
					if(e){ return sendResponse( { error:e } ) }

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
