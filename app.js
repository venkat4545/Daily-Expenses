const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");
const encoder=bodyParser.urlencoded();

const app=express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb'
})
db.connect((err)=>{
  if(err){
    console.log(err)
  }
  console.log("connected!")
})

app.use("/",require("./routes/route"))
app.use("/auth",require("./routes/auth"))
app.listen(8080,()=>{
    console.log("server running on http://localhost:8080/")
})
 