const express=require("express");
const mysql=require("mysql");
const db=mysql.createConnection({
  host:process.env.DATABASE_HOSTNAME,
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

router.get('/getPopupData/:id', (req, res) => {
  const itemId = req.params.id;
  const query="SELECT * FROM tasks WHERE id=?"
  db.query(query,[itemId],(err,results)=>{
    if(err){
      res.status(500).json({ error: 'Internal Server Error' });
    }else{
      if (results.length > 0) {
        const popupData = results[0]; // Assuming ID is unique
        res.json(popupData);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    }
  });
});

router.get('/getPopupDataExpense/:id',(req,res)=>{
  const expenseId=req.params.id;
  const query="SELECT * FROM expenses WHERE id=?";
  db.query(query,[expenseId],(err,results)=>{
    if(err){
      res.status(500).json({error:"Internal Server Error"});
    }else{
      if(results.length>0){
        const popupData=results[0];
        res.json(popupData);
      }else{
        res.status(400).json({error:"Expense not found"});
      }
    }
  })
})

router.get('/auth/login',(req,res)=>{
  return "Logged in";
})

module.exports=router;