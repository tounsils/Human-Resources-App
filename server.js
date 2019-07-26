//import http from "http";
//import * as http from "http"



//import app from "./app";

var http = require("http");
var app = require("./app");

const port = process.env.port || 6002;

const server = http.createServer(app);

server.listen(port, () => {
 console.log("Server started at port " + port)
});
