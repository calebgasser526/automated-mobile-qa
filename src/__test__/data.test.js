appium = require("./appium.test.js");
assert = require("assert");

function findEvent(messages, key, value) {
  for (const message of messages) {
    if (message.request.rawUrl.includes("/v1/import")) {
      let batch_data = JSON.parse(message.requestBody.toString()).batch;
      for (const eventPayload of batch_data) {
        if (
          "properties" in eventPayload &&
          eventPayload.properties[key] === value
        ) {
          return eventPayload;
        }
      }
    }
  }
}

describe("Android Data Tests", () => {
  it("tests app launch", () => {
    const payload = findEvent(appium.androidMessages, "event", "appLaunch");

    if (payload) {
      assert.equal(payload.properties.event, "appLaunch");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });

  it("tests cobrokeLead submission on LDP", () => {
    const payload = findEvent(appium.androidMessages, "event", "cobrokeLead");

    if (payload) {
      assert.equal(payload.properties.event, "cobrokeLead");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });

  it("tests cobrokeLead submission on SRP", () => {
    const payload = findEvent(appium.androidMessages, "event", "cobrokeLead");

    if (payload) {
      assert.equal(payload.properties.event, "cobrokeLead");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });

  it("tests forSaleCobrokePhoneLead on LDP", () => {
    const payload = findEvent(
      appium.androidMessages,
      "event",
      "forSaleCobrokePhoneLead"
    );

    if (payload) {
      assert.equal(payload.properties.event, "forSaleCobrokePhoneLead");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });

  it("tests save listing on LDP", () => {
    const payload = findEvent(appium.androidMessages, "saveItem", "listing");

    if (payload) {
      assert.equal(payload.properties.event, "savedItem");
      assert.equal(payload.properties.saveItem, "listing");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });

  it("tests save listing on SRP", () => {
    const payload = findEvent(appium.androidMessages, "saveItem", "listing");

    if (payload) {
      assert.equal(payload.properties.event, "savedItem");
      assert.equal(payload.properties.saveItem, "listing");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });

  it("tests save search on SRP", () => {
    const payload = findEvent(appium.androidMessages, "saveItem", "search");

    if (payload) {
      assert.equal(payload.properties.event, "savedItem");
      assert.equal(payload.properties.saveItem, "search");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });
});

//describe("iOS Data Tests", () => {
//    it("tests app launch", () => {
//        const payload = findEvent(appium.iosMessages, "appLaunch");
//
//        if (payload) {
//            assert.equal(payload.properties.event, "appLaunch");
//            assert.ok(payload.integrations["Adobe Analytics"].visitorId);
//        } else {
//            throw Error("Could not find event to test...");
//        }
//    });
//})
