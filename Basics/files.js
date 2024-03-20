const fs = require("fs");
const os = require("os")

//? Sync 
// fs.writeFileSync("./test.txt","hello world!")

//?  Async
// fs.writeFile("./test.txt","hey there!",(err)=>{})

//? Sync (Blocking)
// const result = fs.readFileSync("./info.txt","utf-8")
// console.log(result);

//? Async (Non-Blocking)
fs.readFile("./info.txt","utf-8",(err,result)=>{
    if(err){
        console.log('Error',err);
    }
    else{
        console.log(result);
    }
})

//? check the no of cores in the machine
console.log(os.cpus().length);