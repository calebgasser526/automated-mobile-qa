const Mitmproxy = require('mitmproxy').default

async function genCert(){
  let requestHandler = (message) => {}
  let proxy = await Mitmproxy.Create(requestHandler, [], true, true);
  await proxy.shutdown();
}

genCert();
