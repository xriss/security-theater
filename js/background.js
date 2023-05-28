

let fakeurl="https://example.com/"



function getBase64(file) {
const reader = new FileReader()
return new Promise(resolve => {
  reader.onload = ev => {
	resolve(ev.target.result)
  }
  reader.readAsDataURL(file)
})
}


function listener_before(details) {

console.log(details.url)

	let url=details.url
	url=url.split("://cors.proxy/")[1]	

console.log("redirect: "+fakeurl+url)
  return { redirectUrl:fakeurl+url };
}


browser.webRequest.onBeforeRequest.addListener(
  listener_before,
  {urls: ["*://cors.proxy/*"] },
  ["blocking"]
);


// catch fake url redirect and replace content
function listener_test(details) {
	
	let url=details.url.substring(fakeurl.length)
	
console.log("test: "+details.url)

//	browser.webRequest.onBeforeRequest.removeListener(f)

console.log(browser.webRequest)
  let filter = browser.webRequest.filterResponseData(details.requestId);
  
  filter.ondata = async function(event)
  {

  	let response = await fetch(url)
	let ab=await response.arrayBuffer()
console.log(ab)
    filter.write(ab);
    filter.disconnect();
  }

	return {};
}

browser.webRequest.onBeforeRequest.addListener(
	listener_test,
  {urls: [fakeurl+"*"] },
  ["blocking"]
);


