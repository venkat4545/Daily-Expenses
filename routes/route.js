const express=require("express");
const mysql=require("mysql");
const db=mysql.createConnection({
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
})

const router=express.Router();

router.get("/",(req,res)=>{
    res.render('login')
})


router.get("/auth/login",(req,res)=>{
    res.render("wel")
})


module.exports=router;