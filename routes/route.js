const express=require("express");
const mysql=require("mysql");

const router=express.Router();

router.get("/",(req,res)=>{
    res.redirect('index.html')
})

router.get("/signup",(req,res)=>{
    res.redirect('signup.html')
})

router.get("/login",(req,res)=>{
    res.redirect("login.html")
})

router.get("/welcome",(req,res)=>{
    res.redirect("welcome.html")
})

module.exports=router;