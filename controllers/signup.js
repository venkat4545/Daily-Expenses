const mysql=require("mysql");
const notifier = require('node-notifier');
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydb'
})
exports.signup=(req,res)=>{
    const {name,email,password,phno,gender}=req.body;
    console.log(req.body)
    db.query('SELECT Email from signup WHERE email = ?', [email], (err, results) => {
        if(err){
            console.log(err)
        }else if(results.length>0){
            res.send("Email is already in use")
        }
    }) 
    db.query('INSERT INTO signup SET ?', { Name: name, Email: email, password: password,phno:phno,Gender:gender }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            return res.redirect('../welcome.html');
        }
    })
}

exports.login=(req,res)=>{
    const {email,password}=req.body;

    db.query('SELECT Email FROM signup WHERE Email=? AND password=?',[email,password],(err,results)=>{
        if (err) {
            console.log(err);
        } else if(results.length>0) {    
            return res.redirect('../welcome.html');
        }else{
           res.send("Email or Password is incorret!")
        }
    })
}

exports.merchant=(req,res)=>{
    const {restaurantName,contactName,pincode,location,website,phno,averaget}=req.body;
    console.log(req.body)
    db.query('INSERT INTO merchants SET ?', { RestaurantName: restaurantName, ContactName: contactName, Pincode: pincode,Location:location ,Website:website,PhoneNumber:phno,AverageDailyTransactions:averaget }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            return res.send("Merchant registered")
        }
    })
}