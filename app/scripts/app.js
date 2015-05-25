
var natural = require("natural");
var express = require("express");
var serve = require("serve");
var http = require("http");
var fs = require("fs");
var connect = require("connect");

var app = connect();

function onRequest(request, response) {

}

http.createServer(onRequest).listen(8888);

