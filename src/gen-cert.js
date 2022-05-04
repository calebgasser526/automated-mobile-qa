const Mitmproxy = require('mitmproxy').default

async function genCert(){
  let requestHandler = (message) => {
    console.log(message)
  }
  let proxy = await Mitmproxy.Create(requestHandler, [], true, true);
  await proxy.shutdown()
  setTimeout(async ()=>{
    process.exit() 
  }, 3000);
}

genCert();
