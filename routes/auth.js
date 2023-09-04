const express=require("express");
const mysql=require("mysql");
const authcontrollers=require('../controllers/user')

const router=express.Router();

router.post("/signup",authcontrollers.signup)
router.post("/login",authcontrollers.login)
router.post("/addExpense",authcontrollers.todayExpenses)
router.post("/addTask",authcontrollers.todayTask)
router.post("/view",authcontrollers.view);
router.post("/deleteexpense",authcontrollers.deleteexpense);
router.post("/deletetask",authcontrollers.deletetask);
router.post("/popupEditTask",authcontrollers.popupEditTask);
router.post("/popupEditExpense",authcontrollers.popupEditExpense);
module.exports = router;