appium = require("./appium.test.js");
assert = require('assert');

describe("Android data tests", () => {
	it("tests for_sale:srp_map on android.", () => { 
		messages = appium.androidMessages
		messages.forEach( m => {
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

describe("iOS Data tests", () => {
	it("tests for_sale:srp_map on iOS", () => { 
		messages = appium.iosMessages
		messages.forEach( m => {
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
