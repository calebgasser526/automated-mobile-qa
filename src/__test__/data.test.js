appium = require("./appium.test.js");
assert = require('assert');

describe("Android data tests", () => {
	it("tests cobrokeLead submitted on LDP via Contact agent for details button", (done) => { 
		messages = appium.androidMessages;
		messages.forEach(m => {
		  if (m.request.rawUrl.includes("/v1/import")) {
		  		let batch_data = JSON.parse(m.requestBody.toString()).batch;
				batch_data.forEach(event => {
					if ("properties" in event && event.properties.event === "cobrokeLead" &&
						event.properties.leadPlacement === "for_sale:ldp:listing_summary:contact_agent") {
							assert.equal(event.properties.event, "cobrokeLead");
							assert.ok(event.integrations['Adobe Analytics'].visitorId);
							assert.equal(event.properties.leadDelivery, "co_broke");
							assert.equal(event.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
							assert.equal(event.properties.siteSection, "for_sale");
					} else {
						done(new Error("Could not find a suitable lead submission to test against"));
					}
				})
			}
		});
	})
	it("tests cobrokeLead submitted on LDP via the persistent footer", (done) => { 
		messages = appium.androidMessages;
		messages.forEach(m => {
		  if (m.request.rawUrl.includes("/v1/import")) {
		  		let batch_data = JSON.parse(m.requestBody.toString()).batch;
				batch_data.forEach(event => {
					if ("properties" in event && event.properties.event === "cobrokeLead" &&
						event.properties.leadPlacement === "for_sale:ldp:persistent_footer:lead_cta_email") {
							assert.equal(event.properties.event, "cobrokeLead");
							assert.ok(event.integrations['Adobe Analytics'].visitorId);
							assert.equal(event.properties.leadDelivery, "co_broke");
							assert.equal(event.properties.leadPlacement, "for_sale:ldp:persistent_footer:lead_cta_email");
							assert.equal(event.properties.siteSection, "for_sale");
					} else {
						done(new Error("Could not find a suitable lead submission to test against"));
					}
				})
			}
		});
	})
	it("tests cobrokeLead submitted on LDP via the inline form", (done) => { 
		messages = appium.androidMessages;
		messages.forEach(m => {
		  if (m.request.rawUrl.includes("/v1/import")) {
		  		let batch_data = JSON.parse(m.requestBody.toString()).batch;
				batch_data.forEach(event => {
					if ("properties" in event && event.properties.event === "cobrokeLead" &&
						event.properties.leadPlacement === "for_sale:ldp:inline_lead_form:send_request") {
							assert.equal(event.properties.event, "cobrokeLead");
							assert.ok(event.integrations['Adobe Analytics'].visitorId);
							assert.equal(event.properties.leadDelivery, "co_broke");
							assert.equal(event.properties.leadPlacement, "for_sale:ldp:inline_lead_form:send_request");
							assert.equal(event.properties.siteSection, "for_sale");
					} else {
						done(new Error("Could not find a suitable lead submission to test against"));
					}
				})
			}
		});
	})
})

describe("iOS Data tests", () => {
	it("tests cobrokeLead submitted on LDP via Contact agent for details button", (done) => { 
		messages = appium.iosMessages;
		messages.forEach(m => {
		  if (m.request.rawUrl.includes("/v1/import")) {
		  		let batch_data = JSON.parse(m.requestBody.toString()).batch;
				batch_data.forEach(event => {
					if ("properties" in event && event.properties.event === "cobrokeLead" &&
						event.properties.leadPlacement === "for_sale:ldp:listing_summary:contact_agent") {
							assert.equal(event.properties.event, "cobrokeLead");
							assert.ok(event.integrations['Adobe Analytics'].visitorId);
							assert.equal(event.properties.leadDelivery, "co_broke");
							assert.equal(event.properties.leadPlacement, "for_sale:ldp:listing_summary:contact_agent");
							assert.equal(event.properties.siteSection, "for_sale");
					} else {
						done(new Error("Could not find a suitable lead submission to test against"));
					}
				})
			}
		});
	})
	it("tests cobrokeLead submitted on LDP via the persistent footer", (done) => { 
		messages = appium.iosMessages;
		messages.forEach(m => {
		  if (m.request.rawUrl.includes("/v1/import")) {
		  		let batch_data = JSON.parse(m.requestBody.toString()).batch;
				batch_data.forEach(event => {
					if ("properties" in event && event.properties.event === "cobrokeLead" &&
						event.properties.leadPlacement === "for_sale:ldp:persistent_footer:lead_cta_email") {
							assert.equal(event.properties.event, "cobrokeLead");
							assert.ok(event.integrations['Adobe Analytics'].visitorId);
							assert.equal(event.properties.leadDelivery, "co_broke");
							assert.equal(event.properties.leadPlacement, "for_sale:ldp:persistent_footer:lead_cta_email");
							assert.equal(event.properties.siteSection, "for_sale");
					} else {
						done(new Error("Could not find a suitable lead submission to test against"));
					}
				})
			}
		});
	})
	it("tests cobrokeLead submitted on LDP via the inline form", (done) => { 
		messages = appium.iosMessages;
		messages.forEach(m => {
		  if (m.request.rawUrl.includes("/v1/import")) {
		  		let batch_data = JSON.parse(m.requestBody.toString()).batch;
				batch_data.forEach(event => {
					if ("properties" in event && event.properties.event === "cobrokeLead" &&
						event.properties.leadPlacement === "for_sale:ldp:inline_lead_form:send_request") {
							assert.equal(event.properties.event, "cobrokeLead");
							assert.ok(event.integrations['Adobe Analytics'].visitorId);
							assert.equal(event.properties.leadDelivery, "co_broke");
							assert.equal(event.properties.leadPlacement, "for_sale:ldp:inline_lead_form:send_request");
							assert.equal(event.properties.siteSection, "for_sale");
					} else {
						done(new Error("Could not find a suitable lead submission to test against"));
					}
				})
			}
		});
	})
})
