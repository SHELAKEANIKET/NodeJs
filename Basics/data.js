const http = require("http");
const fs = require("fs");
const { log } = require("console");

const info = fs.readFileSync("studentData.json", "utf-8", (err, result) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(result);
  }
});

      const stuData = JSON.parse(info).students;
      console.log(typeof stuData);

const server = http.createServer((req, res) => {


      const data = stuData.map(item=>
     ` ${item.name} ${item.age} ${item.branch} \n\n`
      ).join('')

  res.end(data);
});

server.listen(8080, () => console.log("server started .."));
