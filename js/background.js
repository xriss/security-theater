

let fakeurl="https://example.com/#"



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

	let url=details.url
	url=url.split("://cors.proxy/")[1]	

// catch fake url redirect and replace content
let f;f=async function listener_test(details) {
	
	browser.webRequest.onBeforeRequest.removeListener(f)

  let filter = browser.webRequest.filterResponseData(details.requestId);
  
  filter.ondata = async function(event)
  {

  	let response = await fetch(url)
	let ab=await response.arrayBuffer()

    filter.write(ab);
    filter.disconnect();
  }

	return {};
}
browser.webRequest.onBeforeRequest.addListener(
	f,
  {urls: [fakeurl+url] },
  ["blocking"]
);

  return { redirectUrl:fakeurl+url };
}


browser.webRequest.onBeforeRequest.addListener(
  listener_before,
  {urls: ["*://cors.proxy/*"] },
  ["blocking"]
);

