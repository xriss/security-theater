

function getBase64(file) {
const reader = new FileReader()
return new Promise(resolve => {
  reader.onload = ev => {
	resolve(ev.target.result)
  }
  reader.readAsDataURL(file)
})
}



async function listener_before(details) {
	console.log("Security Theatre before")
	
	let url=details.url
	console.log(url)
	url=url.split("://cors.proxy/")[1]	
	console.log(url)

	let response = await fetch(url)
	let dataurl=await getBase64( await response.blob() )

	console.log(dataurl)

  return { redirectUrl:dataurl };
}


browser.webRequest.onBeforeRequest.addListener(
  listener_before,
  {urls: ["*://cors.proxy/*"] },
  ["blocking"]
);

