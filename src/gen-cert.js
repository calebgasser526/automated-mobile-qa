const Mitmproxy = require('mitmproxy').default
setTimeout(() => {
    process.exit()
}, 3000);
let requestHandler = (message) => {}
proxy = Mitmproxy.Create(requestHandler, [], true, true)
