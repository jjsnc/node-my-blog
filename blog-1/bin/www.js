var http = require("http");
const PORT = 8000

const serverHandle = require('../app')

const server = http.createServer(serverHandle).listen(PORT); 




