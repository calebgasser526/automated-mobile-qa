appium = require("./appium.test.js");
assert = require('assert');

function findEvent(messages, eventName) {
	for (const message of messages) {
		if (message.request.rawUrl.includes("/v1/import")) {
			let batch_data = JSON.parse(message.requestBody.toString()).batch;
			for (const eventPayload of batch_data) {
				console.log(eventPayload);
				if (eventPayload.event === eventName) {
					return eventPayload;
				}
			}
		}
	}
}

describe("Android data tests", () => {
	it("tests app launch", () => {
		const payload = findEvent(appium.androidMessages, "appLaunch");

		assert.equal(payload.properties.event, "appLaunch");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
	})
	it("tests cobrokeLead submitted on SRP via Contact Agent button", () => {
		const payload = findEvent(appium.iosMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	it("tests saved listing on SRP via list view", () => {
		const payload = findEvent(appium.androidMessages, "savedItem");

		assert.equal(payload.properties.event, "savedItem");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
	})
	it("tests cobrokeLead submitted on LDP via Contact agent button", () => { 
		const payload = findEvent(appium.androidMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	// it("tests cobrokeLead submitted on LDP via the inline form", () => { 
	// 	const payload = findEvent(appium.androidMessages, "cobrokeLead");

	// 	assert.equal(payload.properties.event, "cobrokeLead");
	// 	assert.ok(payload.integrations['Adobe Analytics'].visitorId);
	// 	assert.equal(payload.properties.leadDelivery, "co_broke");
	// 	assert.equal(payload.properties.leadPlacement, "for_sale:ldp:inline_lead_form:send_request");
	// 	assert.equal(payload.properties.siteSection, "for_sale");
	// })
	it("tests cobrokeLead submitted on LDP via Contact agent for details button", () => { 
		const payload = findEvent(appium.androidMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	it("tests forSaleCobrokeTextLead on LDP via Text button", () => {
		const payload = findEvent(appium.androidMessages, "forSaleCobrokeTextLead");

		assert.equal(payload.properties.event, "forSaleCobrokeTextLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	// it("tests forSaleCobrokePhoneLead on LDP via phone number", () => {
	// })
	it("tests saved listing on LDP via photo gallery", () => {
		const payload = findEvent(appium.androidMessages, "savedItem");

		assert.equal(payload.properties.event, "savedItem");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
	})
})

describe("iOS Data tests", () => {
	it("tests app launch", () => {
		const payload = findEvent(appium.iosMessages, "appLaunch");
		console.log("ios:", appium.iosMessages);

		assert.equal(payload.properties.event, "appLaunch");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
	})
	it("tests cobrokeLead submitted on LDP via Contact agent button", () => { 
		const payload = findEvent(appium.iosMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	it("tests cobrokeLead submitted on LDP via the inline form", () => { 
		const payload = findEvent(appium.iosMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:inline_lead_form:send_request");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	it("tests cobrokeLead submitted on LDP via Contact agent for details button", () => { 
		const payload = findEvent(appium.iosMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
})
