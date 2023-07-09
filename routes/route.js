const express=require("express");
const mysql=require("mysql");
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb'
})

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

router.get("/view",(req,res)=>{
    res.redirect("view.html")
})

router.get("/welcome",(req,res)=>{
    res.redirect("welcome.html")
})

router.get('/view', function (req, res) {
    db.query('SELECT * FROM merchants', function (err, rows) {
      if (err) {
        res.render('welcome.html', { data: '' })
      } else {
        res.render('view.html', { data: rows })
      }
    })
  })

module.exports=router;