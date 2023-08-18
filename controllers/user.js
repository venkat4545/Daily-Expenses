const mysql=require("mysql");
const notifier = require('node-notifier');
const session = require('express-session');
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})
const totalQuery='SELECT SUM(spent) AS total FROM expenses WHERE employee_id=? AND date=?';
const expensesSelectQuery="SELECT * FROM expenses WHERE employee_id=? AND date=?";
const taskSelectQuery="SELECT * FROM tasks WHERE employee_id=? AND date=?";

function formatDate(date) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
}

exports.signup=(req,res)=>{
    const {name,email,password,phno,empid}=req.body;
    console.log(req.body)
   db.query('SELECT email from users WHERE email = ? OR employee_id=?', [email,empid], (err, results) => {
        if(err){
            console.log(err)
        }else if(results.length>0){
            res.render("login",{message: '*email or empid already exists!'})
        }
    if(results.length==0){
    db.query('INSERT INTO users SET ?', { employee_id:empid,name: name, email: email, password: password,phone_number:phno }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            const today=new Date();
            const formattedDate=formatDate(today)
            res.render("wel",{empid: empid,name:name,date:formattedDate})
        }
    })
   }
})
}

exports.login=(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    const query='SELECT * FROM users WHERE email=? AND password=?';
    db.query(query,[email,password],(err,results)=>{
        if (err) {
            console.log(err);
        }else if(results.length==0){
            res.render("login",{message: '*email or password is incorrect'})
        }
        const today=new Date();
        const formattedDate = formatDate(today);
        const epochdate=Date.parse(formattedDate);
        if(results.length>0){
        db.query(totalQuery,[results[0].employee_id,epochdate],(err2,results2)=>{   
            db.query(expensesSelectQuery,[results[0].employee_id,epochdate],(err1,results1)=>{
                if(err1){
                    console.log(err1);
                }else if(results.length>0) {
                    return res.render("wel",{empid:results[0].employee_id,expensesData:results1,date:formattedDate,total:results2[0].total});
                }else{
                    res.render("login",{message: '*email or password is incorrect'})
                }
            })
    
        })}
    })
}

exports.todayExpenses=(req,res)=>{
    const {empid,todaydate,item,spent}=req.body;
    const epochdate=Date.parse(todaydate);
    console.log(req.body,epochdate)
    db.query('INSERT INTO expenses SET ?', { employee_id: empid, item: item, spent: spent,date:epochdate}, (err, results) => {
        if (err) {
            console.log(err);
        }
        db.query(expensesSelectQuery,[empid,epochdate],(err1,results1)=>{
            db.query(totalQuery,[empid,epochdate],(err2,results2)=>{
                db.query(taskSelectQuery,[empid,epochdate],(err3,results3)=>{
                if(err1){
                    console.log(err1);
                }else {
                    return res.render("wel",{empid:empid,expensesData:results1,total:results2[0].total,date:todaydate,taskData:results3})
                }
            })
            })
        })
    })
}

exports.view=(req,res)=>{
    const {empid,date}=req.body;
    const epochdate=Date.parse(date);
    console.log(req.body);
    db.query(expensesSelectQuery,[empid,epochdate],(err,results)=>{
        db.query(totalQuery,[empid,epochdate],(err1,results1)=>{
            db.query(taskSelectQuery,[empid,epochdate],(err3,results3)=>{
        if(err1){
            console.log(err1);
        }else{
            return res.render("wel",{empid:empid,date:date,expensesData:results,total:results1[0].total,taskData:results3})
        }
        })
        })
    })
}

exports.deleteexpense=(req,res)=>{
    const {empid,id}=req.body;
    const query="DELETE FROM expenses WHERE id=?";
    const today=new Date();
    const formattedDate = formatDate(today);
    const epochdate=Date.parse(formattedDate);
    console.log(req.body);
    db.query(query,[id],(err,results)=>{
    db.query(expensesSelectQuery,[empid,epochdate],(err1,results1)=>{
    db.query(totalQuery,[empid,epochdate],(err2,results2)=>{    
    db.query(taskSelectQuery,[empid,epochdate],(err3,results3)=>{
        if(err||err1){
            console.log(err,err1)
        }else{
           res.render('wel',{empid,expensesData:results1,date:formattedDate,total:results2[0].total,taskData:results3})
        }
    })
    })
    })
    })
}

exports.deletetask=(req,res)=>{
    const {empid,id}=req.body;
    const query="DELETE FROM tasks WHERE id=?";
    const today=new Date();
    const formattedDate = formatDate(today);
    const epochdate=Date.parse(formattedDate);
    console.log(req.body);
    db.query(query,[id],(err,results)=>{
    db.query(expensesSelectQuery,[empid,epochdate],(err1,results1)=>{
    db.query(totalQuery,[empid,epochdate],(err2,results2)=>{    
    db.query(taskSelectQuery,[empid,epochdate],(err3,results3)=>{
    db.query(taskSelectQuery,[empid,epochdate],(err4,results4)=>{
        if(err||err1){
            console.log(err,err1)
        }else{
           res.render('wel',{empid,expensesData:results1,date:formattedDate,total:results2[0].total,taskData:results3,taskData:results4})
        }
    })
    })
    })
    })
    })
}

exports.todayTask=(req,res)=>{
    const {empid,task,todaydate}=req.body;
    const epochdate=Date.parse(todaydate);
    const today=new Date();
    const formattedDate = formatDate(today);
    db.query("INSERT INTO tasks SET ?",{employee_id:empid,task:task,date:epochdate},(err,results)=>{
        db.query(expensesSelectQuery,[empid,epochdate],(err1,results1)=>{
            db.query(totalQuery,[empid,epochdate],(err2,results2)=>{
                db.query(taskSelectQuery,[empid,epochdate],(err3,results3)=>{
                if(err){
                    console.log(err);
                }else{
                    res.render('wel',{empid,expensesData:results1,date:formattedDate,total:results2[0].total,taskData:results3})
                }
            })
            })
        })
    })

}