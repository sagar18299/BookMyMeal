require('dotenv').config();
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const Joi = require('joi');
const authAdmin = require('../middlewares/auth-admin');

router.post('/createNewUser', authAdmin , async (req,res) =>{
  try {
    //check request using joi 
    const { error , value  } = registerUserValidationSchema().validate(req.body, { abortEarly : false });
    if( error ) return res.status(400).send({ message : 'Bad Request', error : error.details });

    let user = await User.findOne({ email : value.email});
    if(user)  return res.status(404).send({ mesasge : "User already registered with this email id" });
    user = await User.findOne({ employeeId  : value.employeeId });
    if(user)  return res.status(404).send({ mesasge : "User already registered with employee ID" });
    // get users 

    user = new User({
      firstName : value.firstName,
      lastName : value.lastName,
      email : value.email,
      employeeId : value.employeeId,
      mobile : value.mobile,
      role : value.role,
      createdBy : req.user._id,
      department : value.department
    });

    const password = randomstring.generate(10);
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hashSync(password, salt);

    user = await user.save();

  
    
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
    subject: 'New user registered', // Subject line
    html: `<!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Book My Meal</title>
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
            .credentials {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .label {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Book My Meal</h1>
            <p>Dear ${user.firstName},</p>
            <p>Welcome to Book My Meal! Your account has been successfully created. Please find your login credentials below:</p>
            <div class="credentials">
                <p class="label">Email:</p>
                <p>${user.email}</p>
                <p class="label">Password:</p>
                <p>${password}</p>
            </div>
            <p>You can now access your account and start using our services.</p>
            <p>Thank you for choosing Book My Meal!</p>
        </div>
    </body>
    </html>
    `   };

   transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err)
      } 
    });
    res.status(200).send({ data : user, message : 'User added sucessfully' });
  } catch (error) {
    console.log('/createNewUser', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

const registerUserValidationSchema = () => {
  const schema = Joi.object({
    firstName : Joi.string().required().min(2).max(30).trim().label('First Name'),
    lastName : Joi.string().required().min(2).max(30).trim().label('Last Name'),
    employeeId :  Joi.string().required().trim().label('Employee ID'),
    email : Joi.string().email().required().lowercase().label('Email ID'),
    mobile : Joi.string().regex(/^[0-9]+$/),
    department : Joi.string().required().min(2).max(30).trim().label('department'),
    role : Joi.string().required().min(2).max(30).trim().label('role')
  });
  return schema;
}


router.post('/createNewAdmin', async (req,res) =>{
  try {
    //check request using joi 
    const { error , value  } = ValidationAdminSchema().validate(req.body, { abortEarly : false });
    if( error ) return res.status(400).send({ message : 'Bad Request', error : error.details });

    let user = await User.findOne({ email : value.email});
    if(user)  return res.status(404).send({ mesasge : "User already registered with this email id" });
    user = await User.findOne({ employeeId  : value.employeeId });
    if(user)  return res.status(404).send({ mesasge : "User already registered with employee ID" });
    // get users 

    user = new User({
      firstName : value.firstName,
      lastName : value.lastName,
      email : value.email,
      role: 'admin',
      employeeId : value.employeeId,
      department : value.department
    });

    const password = randomstring.generate(10);
    console.log('password',password)
   // const password = '12345';
    const salt = await bcrypt.genSalt(10);
    user.password = bcrypt.hashSync(password, salt);

    user = await user.save();

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
    subject: 'New user registered', // Subject line
    html: `<!DOCTYPE html>
    <html>
    <head>
        <title>Welcome to Book My Meal</title>
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
            .credentials {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .label {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Book My Meal</h1>
            <p>Dear ${user.firstName},</p>
            <p>Welcome to Book My Meal! Your account has been successfully created. Please find your login credentials below:</p>
            <div class="credentials">
                <p class="label">Email:</p>
                <p>${user.email}</p>
                <p class="label">Password:</p>
                <p>${password}</p>
            </div>
            <p>You can now access your account and start using our services.</p>
            <p>Thank you for choosing Book My Meal!</p>
        </div>
    </body>
    </html>
    ` 
   };

   transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err)
      } 
    });
    res.status(200).send({ data : user, message : 'User added sucessfully' });
  } catch (error) {
    console.log('/createNewUser', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});


   


const ValidationAdminSchema = () => {
  const schema = Joi.object({
    firstName : Joi.string().required().min(2).max(30).trim().label('First Name'),
    lastName : Joi.string().required().min(2).max(30).trim().label('Last Name'),
    employeeId :  Joi.string().required().trim().label('Employee ID'),
    email : Joi.string().email().required().lowercase().label('Email ID'),
    role: Joi.string().label('Role'),
    mobile : Joi.string().regex(/^[0-9]+$/),
    department : Joi.string().required().min(2).max(30).trim().label('department')
  });
  return schema;
}

module.exports = router;