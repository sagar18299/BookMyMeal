
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Calendar } = require('../models/calendar');
const { Meal } = require('../models/meal');
const auth = require('../middlewares/auth-admin');
const { User } = require('../models/user');
const nodemailer = require('nodemailer');


router.post('/disableDate', auth , async (req,res) =>{
  try {
    const date = new Date(req.body.date);
    // validation req.body using joi
    // date must be future date
    let calendar = await Calendar.findOne({ date : date } );
    if(calendar) return res.status(400).send({ message : `Date ${date.toDateString()} is already disabled` });

    calendar = new Calendar({
      date : date.toISOString(),
      description : req.body.description,
      createdBy : req.user._id
    });
    calendar = await calendar.save();
    // get booking for this date 

    const meals = await Meal.aggregate([
      {
        $match : { $and: [{ date  :  { $eq : date } }, {  type : 'employee'  }]}    
      },
      {
        $group : {
          _id : "$employeeId",
          date : { $push : "$date" }
        }
      },
      {
        $project : {
          _id : 1,
          date : 1,
          total : { $size : "$date" }
        }
      }
    ]);

    const employeeIds = meals.map(meal => meal._id);

    const users = await User.find({ employeeId: { $in: employeeIds } });

    const userEmails = users.map(user => user.email);

    // disabled user 
    await Meal.updateMany({ date : date } , { $set : { disabled : true, disabledDescription : req.body.description } });
  
    // get the employee ids in array to send email for disabled date

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port:  587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
   });

   for (const user of users) {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: 'Meal Cancellation',
      text: `Dear ${user.firstName},\n\nYour meal on ${date.toDateString()} has been canceled.\n\nRegards,\nBook My Meal`,
      html: `<!DOCTYPE html>
      <html>
      <head>
          <title>Meal Cancellation</title>
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
              .message {
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
              <h1>Meal Cancellation</h1>
              <p>Dear ${user.firstName},</p>
              <p>We regret to inform you that your meal on ${date.toDateString()} has been canceled.</p>
              <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
              <p>Thank you for your understanding.</p>
              <p>Regards,<br>Book My Meal</p>
          </div>
      </body>
      </html>
      `,
    };
  
    // Send the email
    await transporter.sendMail(mailOptions);
  }


    
    // email
    res.status(200).send({ message : 'Disabled date added into calendar.', data : { calendar , meals,userEmails  }});
  } catch (error) {
    console.log('/loginEmployee', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});




router.post('/getAllCalendarDates', auth , async (req,res) =>{
  try {
    //
    const pageOptions = {
      page : req.body.pageNo,
      limit : req.body.limit
    }

    const totalCount = await Calendar.count()
    const calendarDates = await Calendar.find({}).sort({ createdAt : -1 }).skip((pageOptions.page) * pageOptions.limit).limit(pageOptions.limit);
    res.status(200).send({ message : 'disabled dates get successfully.', data : { caledarDates: calendarDates, total: totalCount }  });

  } catch (error) {
    console.log('/getAllCalendarDates', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});


module.exports = router;