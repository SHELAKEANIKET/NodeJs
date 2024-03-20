const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express(); // here app is handler function behind the scense

app.get('/',(req,res)=>{
  res.send('This is home page')
})
app.get('/about',(req,res)=>{
  res.send('This is about page')
})

app.listen(8080,()=>console.log('server started ...')); //! this is used for express

//!  This code is used for http  module ==== start
function pathHandler(req, res) {
  // if(req.url === '/favicon.ico') return res.end();
  // const log = `${Date.now().toLocaleString()} ${
  //   req.url
  // }: new request received\n`;
  //? parsing the URL using 'url' module
  // const myUrl = url.parse(req.url,true)
  // console.log(myUrl);
  //? getting the request's from url's into the text file
  // fs.appendFile("log.txt", log, (err, data) => {
  //?  handling different URL's request
  //   switch (myUrl.pathname) {
  //     case "/":
  //       res.end("home page");
  //       break;
  //     case "/about":
  //      const name = myUrl.query.myname
  //       res.end(`Hi, ${name}`);
  //       break;
  //     case "/contact":
  //       res.end("contact page");
  //       break;
  //     default:
  //       res.end("404 Page Not Found");
  //   }
  // });
}

const server = http.createServer(pathHandler);
server.listen(8000, () => console.log("server started ..."));

//! ==== end