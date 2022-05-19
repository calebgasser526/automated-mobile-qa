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
	it("tests cobrokeLead submitted on LDP via Contact agent button", () => { 
		const payload = findEvent(appium.androidMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	it("tests cobrokeLead submitted on LDP via the inline form", () => { 
		const payload = findEvent(appium.androidMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:inline_lead_form:send_request");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
	it("tests cobrokeLead submitted on LDP via Contact agent for details button", () => { 
		const payload = findEvent(appium.androidMessages, "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations['Adobe Analytics'].visitorId);
		assert.equal(payload.properties.leadDelivery, "co_broke");
		assert.equal(payload.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
		assert.equal(payload.properties.siteSection, "for_sale");
	})
})

describe("iOS Data tests", () => {
	it("tests app launch", () => {
		const payload = findEvent(appium.iosMessages, "appLaunch");

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
