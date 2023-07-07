const express=require("express");
const mysql=require("mysql");
const authcontrollers=require('../controllers/signup')

const router=express.Router();

router.post("/signup",authcontrollers.signup)
router.post("/login",authcontrollers.login)
router.post("/merchants",authcontrollers.merchant)

module.exports = router;