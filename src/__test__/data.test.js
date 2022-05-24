appium = require("./appium.test.js");
assert = require('assert');

function findEvent(messages, key, value) {
	for (const message of messages) {
		if (message.request.rawUrl.includes("/v1/import")) {
			let batch_data = JSON.parse(message.requestBody.toString()).batch;
			for (const eventPayload of batch_data) {
				console.log(eventPayload);
				if (eventPayload[key] === value) {
					return eventPayload;
				}
			}
		}
	}
}

describe("Android Data Tests", () => {
	it("tests app launch", () => { 
		const payload = findEvent(appium.androidMessages, "event", "appLaunch");

		assert.equal(payload.properties.event, "appLaunch");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});

	it("tests cobrokeLead submission on LDP", () => {
		const payload = findEvent(appium.androidMessages, "event", "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});

	it("tests cobrokeLead submission on SRP", () => {
		const payload = findEvent(appium.androidMessages, "event", "cobrokeLead");

		assert.equal(payload.properties.event, "cobrokeLead");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});

	it("tests forSaleCobrokePhoneLead on LDP", () => {
		const payload = findEvent(appium.androidMessages, "event", "forSaleCobrokePhoneLead");

		assert.equal(payload.properties.event, "forSaleCobrokePhoneLead");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});

	it("tests save listing on LDP", () => {
		const payload = findEvent(appium.androidMessages, "event", "savedItem");

		assert.equal(payload.properties.event, "savedItem");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});

	it("tests save listing on SRP", () => {
		const payload = findEvent(appium.androidMessages, "event", "savedItem");

		assert.equal(payload.properties.event, "savedItem");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});

	it("tests save search on SRP", () => {
		const payload = findEvent(appium.androidMessages, "event", "savedItem");

		assert.equal(payload.properties.event, "savedItem");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});
})

describe("iOS Data Tests", () => {
	it("tests app launch", () => { 
		const payload = findEvent(appium.iosMessages, "appLaunch");

		assert.equal(payload.properties.event, "appLaunch");
		assert.ok(payload.integrations["Adobe Analytics"].visitorId);
	});
})
