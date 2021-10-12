androidMain = require("./ios.test.js");
assert = require('assert');

describe("Segment iOS tests", () => {
	it("Running segment iOS tests", () => { 
		messages = androidMain.interceptedMessages
		console.log("Testing network data.")
		messages.forEach( m => {
		  console.log(m)
		  try {
			  console.log(m.requestBody.toString())
			} catch {
				console.log("Error")
			}
		  if(m.request.rawUrl.includes("/v1/import")){
		  		let batch_data = JSON.parse(m.requestBody.toString()).batch;
				batch_data.forEach( event => {
					if("properties" in event){
						if(event.properties.pageName == "for_sale:srp_map"){
							assert.equal(event.properties.pageName, "for_sale:srp_map");
							assert.ok(event.integrations['Adobe Analytics'].visitorId);
						}
					}
				})
			}
		});
	})
})