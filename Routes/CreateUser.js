const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtscret = "MynameisRitiksingh1$#"
router.post("/creatuser",[
body('email').isEmail(),
body('name').isLength({ min:5 }),
body('password').isLength({ min:5 }),
], async (req , res) => {
     const error = validationResult(req);
       if (!error.isEmpty()) {
    return res.status(400).send({ error:error.array()});
  }
   const salt = await bcrypt.genSalt(10)
   let secPassword = await bcrypt.hash(req.body.password,salt)
    try{
        await User.create({
            name:req.body.name,
            password:secPassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true})
    }catch(error) {
        console.log(error)
        res.json({success:false})
    }
})
router.post("/loginuser",[
body('email').isEmail(),
body('password').isLength({ min:5 })], async (req , res) => {
     const error = validationResult(req);
       if (!error.isEmpty()) {
    return res.status(400).send({ error:error.array()});
  }
  let email = req.body.email
    try{
       let userData = await User.findOne({email})
       if (!userData) {
          return res.status(400).send({ error:"Enter correct credential"});
       }
       const passwcomp = await bcrypt.compare(req.body.password,userData.password )
        if (!passwcomp) {
          return res.status(400).send({ error:"Enter correct credential"});
       }
       const data = {
        user:{
          id:userData.id
        }
       }
       const authToken = jwt.sign(data,jwtscret)
        res.json({success:true, authToken:authToken})
    }catch(error) {
        console.log(error)
        res.json({success:false})
    }
})
module.exports = router;