androidMain = require("./android.test.js");
assert = require('assert');

describe("Segment android tests", () => {
	it("Running segment android tests", () => { 
		messages = androidMain.interceptedMessages
		console.log("Testing network data.")
		messages.forEach( m => {
		  console.log(m)
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