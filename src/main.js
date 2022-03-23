const proxy = require('./proxy');

function getNamedArg(argName){
  let index = process.argv.indexOf(argName);
   if (index > -1) {
     return process.argv[index + 1];
   }
}

let port = getNamedArg("--port");

proxy.run(port);
