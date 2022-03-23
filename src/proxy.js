module.exports = {
  run: (port) => {
    var Proxy = require('http-mitm-proxy');
    var proxy = Proxy();
    proxy.onError(function(ctx, err) {
        console.error('Proxy error:', err);
    });
     
    proxy.onRequest(function(ctx, callback) {
      consule.log("Captured request")
        ctx.onResponseData(function(ctx, chunk, callback) {
          console.log(chunk.toString());
          return callback(null, chunk);
        });
        return callback();
    });
    console.log("Starting proxy on port " + port); 
    proxy.listen({port: port});
  }
}
