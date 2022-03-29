module.exports = {
  run: (port) => {
    var Proxy = require('http-mitm-proxy');
    var path  = require('path');
    var proxy = Proxy();

    proxy.onError(function(ctx, err, errorKind) {
      // ctx may be null
      var url = (ctx && ctx.clientToProxyRequest) ? ctx.clientToProxyRequest.url : '';
      console.error(errorKind + ' on ' + url + ':', err);
    });

    proxy.onCertificateRequired = function(hostname, callback) {
      console.log("Certificate required for: %s", hostname)
      return callback(null, {
        keyFile: path.resolve('.http-mitm-proxy/keys/', hostname + '.key'),
        certFile: path.resolve('.http-mitm-proxy/certs/', hostname + '.crt')
      });
    }

    //proxy.onCertificateMissing = function(ctx, files, callback) {
    //  console.log('Looking for "%s" certificates', ctx.hostname);
    //  console.log('"%s" missing', ctx.files.keyFile);
    //  console.log('"%s" missing', ctx.files.certFile);
    //
    //  // Here you have the last chance to provide certificate files data
    //  // A tipical use case would be creating them on the fly
    //  //
    //  // return callback(null, {
    //  //   key: keyFileData,
    //  //   cert: certFileData
    //  // });
    //};

    proxy.onRequest(function(ctx, callback) {
      console.log('Request: http://' + ctx.clientToProxyRequest.headers.host + ctx.clientToProxyRequest.url);
      ctx.onRequestData(function(ctx, chunk, callback) {
        console.log('request data length: ' + chunk.length);
        return callback(null, chunk);
      });
      return callback(null);
    });
    
    proxy.onResponse(function(ctx, callback) {
      console.log('Response: http://' + ctx.clientToProxyRequest.headers.host + ctx.clientToProxyRequest.url);
      ctx.onResponseData(function(ctx, chunk, callback) {
        console.log('response data length: ' + chunk.length);
        return callback(null, chunk);
      });  
      return callback(null);
    });

    proxy.listen({ port: port, keepAlive: true });
    console.log('Proxy started on port: ' + port);
  }
}
