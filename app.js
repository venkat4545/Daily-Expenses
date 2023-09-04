const express=require("express");
const mysql=require("mysql");
const bodyParser=require("body-parser");
const dotenv=require('dotenv');
const path=require('path');
const hbs = require('hbs')
const encoder=bodyParser.urlencoded();
const session = require('express-session');

const app=express()
const publicdirectory=path.join(__dirname,'./public')
const imageDirectory=path.join(__dirname,'./images')
dotenv.config({path:'./.env'});
app.use(express.static(publicdirectory))
app.use(express.static(imageDirectory));
app.use(express.urlencoded({ extended: false }));
//register helpers
hbs.registerHelper('isEqual', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this);
})
//check db connection status
const db=mysql.createConnection({
    host:process.env.DATABASE_HOSTNAME,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})
db.connect((err)=>{
  if(err){
    console.log(err)
  }else{
  console.log(process.env.DATABASE,"is connected!")
  }
})
app.set('view engine', 'hbs')
app.use("/",require("./routes/route"))
app.use("/auth",require("./routes/auth"))
// app.listen();    //use in production
app.listen(8080,()=>{
    console.log("server running on http://localhost:8080/") //development use
})
 
