var Proxy = require('http-mitm-proxy');
var proxy = Proxy();
proxy.listen({port: 8081})
setTimeout(()=>{process.exit()}, 2000);
