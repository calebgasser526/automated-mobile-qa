appium = require("./ios-appium.test.js");
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

describe("iOS Data Tests", () => {
  it("tests app launch", () => {
    const payload = findEvent(appium.iosMessages, "appLaunch");

    if (payload) {
      assert.equal(payload.properties.event, "appLaunch");
      assert.ok(payload.integrations["Adobe Analytics"].visitorId);
    } else {
      throw Error("Could not find event to test...");
    }
  });
});
