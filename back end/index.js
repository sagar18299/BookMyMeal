require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const employeeRouter = require('./routes/employee');
const employeeCertificationRouter = require('./routes/employee-certification');
const mealRouter = require('./routes/meal');
const meal2Router = require('./routes/meal2');
const calendarRouter = require('./routes/calendar');
const reedemMealCouponRouter = require('./routes/reedem-meal-coupon');
const getemployee = require('./routes/getemployee')
const validJson = require('./middlewares/valid-json');
app.use(express.json());
app.use(validJson);
const cookiParser = require("cookie-parser");
const cors = require("cors");


app.use(cors());
app.use(cookiParser());
app.use('/users',userRouter);
app.use('/employee',employeeRouter);
app.use('/employeeCertification',employeeCertificationRouter);
app.use('/reedemCoupon',reedemMealCouponRouter);
app.use('/calendar',calendarRouter);
app.use('/meal',mealRouter);
app.use('/meal2',meal2Router);
app.use('/employees',getemployee);


app.get('/', (req,res) => {
 // return res.status(200).type('html').send('<marquee><h1> Organization server working</h1></marquee>');
 try {
  return res.status(200).type('html').send('<marquee><h1> Organization server working</h1></marquee>');
   //return res.status(200).send({ data : 'ok' });
 } catch (error) {
    console.log('init server error', error);
    return res.status(500).send('something went wrong. please try after some time');
 }
});

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser : true })
.then( () => {
  console.log('Connected with organization database')
})
.catch( () => {
  console.log('Connction failed...')
});

const port = process.env.PORT;

app.listen(port, ()=>{
  console.log(`Sever is listening on port ${port}`);
});