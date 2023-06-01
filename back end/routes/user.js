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
    subject: 'Node Mailer New user registered', // Subject line
    text: `Hello People!, Welcome to Book MY MEAL your credentials are email : ${user.email} , password : ${password}`, // Plain text body
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
    subject: 'Node Mailer New user registered', // Subject line
    text: `Hello People!, Welcome to Book MY MEAL your credentials are email : ${user.email} , password : ${password}`, // Plain text body
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