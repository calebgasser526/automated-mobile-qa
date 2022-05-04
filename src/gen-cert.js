const Mitmproxy = require('mitmproxy').default

async function genCert(){
  let requestHandler = (message) => {
  }
  console.log("Loading proxy")
  let proxy = await Mitmproxy.Create(requestHandler, [], true, true);
  setTimeout(async ()=>{
    await proxy.shutdown()
  }, 3000)
}

genCert();
