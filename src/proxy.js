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

     proxy.listen({ port: port, forceSNI: true});
    // proxy.listen({ port: 8888, keepAlive: true, forceSNI: true, httpsPort: port });
    console.log('Proxy started on port: ' + port);
  }
}
