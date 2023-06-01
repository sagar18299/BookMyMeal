require('dotenv').config();
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


router.post('/forgotPasswordLink' , async (req,res) =>{
    
    const {email} = req.body;
  try {

    let user = await User.findOne({ email : email});


    const token = generateAuthToken(user);

    const setusertoken = await User.findByIdAndUpdate({_id:user._id},{verifytoken:token},{new:true});



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
    html:`<!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #f5f5f5;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                margin-top: 10px;
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
            }
            .button.white-text {
                color: #fff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Password Reset</h1>
            <p>Hello ${user.firstName},</p>
            <p>We have received a request to reset your password. To proceed with the password reset, please click the button below:</p>
            <a href="http://localhost:3000/forgotpassword/${user._id}/${setusertoken.verifytoken}" class="button white-text">Reset Password</a>
            <p>If you didn't request a password reset, please ignore this email.</p>
            <p>Thank you.</p>
        </div>
    </body>
    </html>
    `   };

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error",error);
            res.status(401).json({status:401,message:"email not send"})
        }else{
            res.status(200).json({status:200,message:"Email sent Succsfully"})
        }
    })
} catch (error) {
    res.status(401).json({status:401,message:"invalid user"})
}
});

router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;
    try {
        const validuser = await User.findOne({_id:id,verifytoken:token});

        
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_EMPLOYEE);


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


    try {
        const validuser = await User.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_EMPLOYEE);

        if(validuser && verifyToken._id){
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



















  