const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Meal } = require('../models/meal');
const Joi = require('joi');
const authAdmin = require('../middlewares/auth-admin');
const moment = require('moment');
const _ = require('lodash');

router.post('/createMealBookings', authAdmin , async (req,res) =>{
  try {
    //validation
      const startDate = moment(req.body.startDate).startOf('day');
      const endDate = moment(req.body.endDate).endOf('day');

     const dates = getDatesBetweenStartDateAndEndDate(startDate, endDate);

     // insert dates into database

     for await (const date of dates){
      let meal = await Meal.findOne({ date : { $eq : new Date(date).toISOString() }});
      if(!meal) {
        // fresh insert
        meal = new Meal({
          date : date,
          lunchEmployees : req.body.lunchEmployees,
          createdBy : req.user._id
        });
      }else {
        // update it 
        // check if 
        if(req.body.lunchEmployees){
          //meal.lunchEmployees =  ...new Set(...meal.lunchEmployees, ...req.body.lunchEmployees) ;
          meal.lunchEmployees = _.union(meal.lunchEmployees, req.body.lunchEmployees);
          //meal.lunchEmployees.push(req.body.lunchEmployees[0]);
        }
        console.log('meal',meal);

      }
      meal = await meal.save();
     }
    res.status(200).send({ data : dates, message : 'Meal added sucessfully' });
  } catch (error) {
    console.log('/createNewUser', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});


router.post('/getMealBookingByDate', authAdmin , async (req,res) =>{
  try {
    // validation login using joi ( Joi.date().format('YYYY-MM-DD'))
    const date = new Date(req.body.date).toISOString();
    console.log(date);
    const meal = await Meal.findOne({ date : { $eq : new Date(date).toISOString() }});
    let data = { }
    if ( meal.lunchEmployees.length > 0 ){
      data.lunchEmployees = meal.lunchEmployees.length;
    } else {
      data.lunchEmployees = 0;
    }
    if ( meal.dinnerEmployees.length > 0 ){
      data.dinnerEmployees = meal.dinnerEmployees.length;
    } else {
      data.dinnerEmployees = 0;
    }
    
    if (meal.nonEmployees > 0 ){
      data.nonEmployees = meal.nonEmployees
    }else {
      data.nonEmployees = meal.nonEmployees
    }
    if (meal.custom > 0 ){
      data.custom = meal.custom
    }else {
      data.custom = meal.custom
    }

    return res.status(200).send({ data : data, meal : meal, message : 'Meal data get sucessfully' });
  } catch (error) {
    console.log('/createNewUser', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

const getDatesBetweenStartDateAndEndDate = (startDate,endDate) =>{
  var now = startDate.clone(), dates = [];
  
  while(now.isSameOrBefore(endDate)){
    // 2023-05-02
    dates.push(now.format('YYYY-MM-DD'));
    now.add(1,'days');
  }
  return dates;
} 

const mealBookingValidationSchema = () => {
  const schema = Joi.object({
    type : Joi.string().required().valid('employee, nonEmployee, custom').label('Type'),
    mealType :  Joi.string().required().valid('lunch, dinner').label('Meal Type'),
    startDate : Joi.string().required().label('Start Date'),
    endDate : joi.string().required().label('End Date'),
    empId : joi
  });
  return schema;
}

router.post('/getMealBookingByEmployeesByMonth', authAdmin , async (req,res) =>{
  try {
      //req validation using joi
      const input = "06-23"
    const inputMonth = moment(input,"MM-YY");
    const startDate = inputMonth.clone().startOf('month');
    const endDate = inputMonth.clone().endOf('month');
    console.log('startDate' , startDate.toISOString());
    console.log('endDate' , endDate.toISOString());

    const employees = await Meal.aggregate([
      {
        $match : { $and : [ { date : { $gte : new Date(startDate) }}, { date : { $lte : new Date(endDate) }}  ] }
      },
      {
        $addFields : {
          employeeId : { $concatArrays : [ "$lunchEmployees" ,"$dinnerEmployees"] }
        }
      },
      {
        $addFields : {
          date : { $dateToString : { format : "%d" , date : "$date" } }
        }
      },
      {
        $unwind : "$employeeId"
      },
      {
        $group : {
          _id : "$employeeId",
          date : { $push : "$date" }
        }
      },
      // {
      //   $lookup : {
      //     from: "users",
      //     localField : "user",
      //     foreignField : "_id",
      //     as : "employee"
      //   }
      // },
      {
        $sort : { _id : 1 }
      }
    ]);

 return res.status(200).send({ employees ,message : 'Meal data get sucessfully' });
  } catch (error) {
    console.log('/getMealBookingByEmployeesByMonth', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

module.exports = router;



//  //check request using joi 
//  const { error , value  } = registerUserValidationSchema().validate(req.body, { abortEarly : false });
//  if( error ) return res.status(400).send({ message : 'Bad Request', error : error.details });

//  let user = await User.findOne({ email : value.email });
//  if(user)  return res.status(404).send({ mesasge : "User already registered with this email id" });
 
//  // get users 

//  user = new User({
//    firstName : value.firstName,
//    lastName : value.lastName,
//    email : value.email,
//    createdBy : req.user._id
//  });

//  //const password = randomstring.generate(10);
//  const password = '12345';
//  const salt = await bcrypt.genSalt(10);
//  user.password = bcrypt.hashSync(password, salt);

//  user = await user.save();
//  //send email to employee email id 
//   // sendEmail('emailid', 'password');
//  //