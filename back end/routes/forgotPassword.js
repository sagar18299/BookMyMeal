require('dotenv').config();
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const Joi = require('joi');
const authAdmin = require('../middlewares/auth-admin');
const jwt = require('jsonwebtoken');


router.post('/forgotPasswordLink' , async (req,res) =>{
    console.log(req.body);
    const {email} = req.body;
  try {
    //check request using joi 
    // const { error , value  } = registerUserValidationSchema().validate(req.body, { abortEarly : false });
    // if( error ) return res.status(400).send({ message : 'Bad Request', error : error.details });

    let user = await User.findOne({ email : email});
// console.log(user);

    const token = generateAuthToken(user);

    const setusertoken = await User.findByIdAndUpdate({_id:user._id},{verifytoken:token},{new:true});

console.log(setusertoken);



//send email
    
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port:  587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
   });

   const mailOptions = {
    from: process.env.EMAIL_USERNAME, // Sender address
    to: user.email, // List of recipients
    subject:"Sending Email For password Reset",
    text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${user._id}/${setusertoken.verifytoken}`   };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error",error);
            res.status(401).json({status:401,message:"email not send"})
        }else{
            console.log("Email sent",info.response);
            res.status(200).json({status:200,message:"Email sent Succsfully"})
        }
    })
} catch (error) {
    res.status(401).json({status:401,message:"invalid user"})
}
});

router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;
    // console.log(id,token);
    try {
        const validuser = await User.findOne({_id:id,verifytoken:token});

        // console.log(validuser);
        
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_EMPLOYEE);

        // console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(200).json({status:200,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

router.post("/resetPassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    console.log(password);

    try {
        const validuser = await User.findOne({_id:id,verifytoken:token});
        // console.log(validuser);
        
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_EMPLOYEE);
        console.log(verifyToken);

        if(validuser && verifyToken._id){
            // const newpassword = await bcrypt.hash(password,12);
            const salt = await bcrypt.genSalt(10);
            const newpassword = bcrypt.hashSync(password, salt);

            const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(200).json({status:200,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});








function  generateAuthToken(user) {
    const token = jwt.sign({ _id : user._id }, process.env.JWT_SECRET_EMPLOYEE, { expiresIn : "1d" }, { algorithm : 'RS256' });
    return token;
  }

module.exports = router;



















  