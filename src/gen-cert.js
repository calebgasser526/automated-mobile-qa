var fs = require('fs');
var Forge = require('node-forge');
var Proxy = require('http-mitm-proxy');
var proxy = Proxy();
proxy.listen({ port: 7474 }, ()=>{
  fs.readFile('.http-mitm-proxy/certs/ca.pem', 'utf8', (err, data)=>{
    var cert = Forge.pki.certificateFromPem(data);
    fs.writeFile('.http-mitm-proxy/certs/android_ca.crt', Forge.asn1.toDer(Forge.pki.certificateToAsn1(cert)).getBytes(), 'binary', ()=>{});
    process.exit()
  });
});
