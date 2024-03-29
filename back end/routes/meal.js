const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Meal } = require('../models/meal');
const { Calendar } = require('../models/calendar');
const Joi = require('joi');
const authAdmin = require('../middlewares/auth-admin');
const moment = require('moment');
const _ = require('lodash');

const { EMPLOYEE, NON_EMPLOYEE,CUSTOM } = require('../constants/constants');

router.post('/createMealBookings', authAdmin , async (req,res) =>{
  try {
    //validation joi
    const { error , value  } = createMealBookingValidationSchema().validate(req.body, { abortEarly : false });
    if( error ) return res.status(400).send({ message : 'Bad Request', error : error.details });

    const startDate = moment(req.body.startDate).startOf('day');
    const endDate = moment(req.body.endDate).endOf('day');

     const dates = getDatesBetweenStartDateAndEndDate(startDate, endDate);

     // check disabled date or not in this array list
     const disabledDates = await Calendar.find({ $and : [ { date : { $gte : new Date(req.body.startDate) } }, { date : { $lte : new Date(req.body.endDate) } } ] } ).select('date');
     const disabledDatesFormatted = getDisabledDateFormatted(disabledDates);
     const finalDates = getFinalDates(dates,disabledDatesFormatted);
     
     // insert dates into database
     for await (const date of finalDates){
      const employeeIds = req.body.employeeIds;
      if(req.body.employeeIds.length>0){
        for await (const emp of employeeIds){
          const data = { mealType : req.body.mealType ,  type : req.body.type , date : new Date(date).toISOString() ,  employeeId :  emp };
      
          let meal = await Meal.findOne(data);
          if(!meal) {
            // fresh insert
            meal = new Meal({
              mealType : req.body.mealType,
              type : req.body.type ,
              date : new Date(date).toISOString(),
              employeeId : emp,
              createdBy : req.user._id
            });
  
            if(req.body.count){
              meal.count = req.body.count
            }
          }
          meal = await meal.save();
        }
    }else{

      const data = { mealType : req.body.mealType ,  type : req.body.type , date : new Date(date).toISOString() };
      let meal = await Meal.findOne(data);
      
      meal = new Meal({
        mealType : req.body.mealType,
        type : req.body.type ,
        date : new Date(date).toISOString(),
        count : req.body.count,
        notes : req.body.notes,
        createdBy : req.user._id
      });
      meal = await meal.save();
    }
  }
    res.status(200).send({ data : finalDates,message : 'Meal added sucessfully' });
  } catch (error) {
    console.log('/createMealBookings', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.post('/getMealBookingsByDate', authAdmin , async (req,res) =>{
  try {
    const date = new Date(req.body.date);
    const meals = await Meal.find({ date : date.toISOString() });

    // internally logic 

    res.status(200).send({ data : meals, message : 'Meal by date get sucessfully' });
  } catch (error) {
    console.log('/getMealBookingsByDate', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.post('/getMealBookingsByDateAggregation', authAdmin , async (req,res) =>{
  try {
    const date = new Date(req.body.date);
    const meals = await Meal.aggregate([
      { 
        $match : { date : { $eq : date } }
      },
       {
        $group : {
          _id :  "$type",
          
          meals : { $push : "$$ROOT" },
          total : { $sum : 1 },
          count : { $sum : "$count" }
        }
      },
      {
        $project : {
          "meals" : 0
        }
      }
    ]);

    // internally logic 

    res.status(200).send({ data : meals, message : 'Meal by date aggregation get sucessfully' });
  } catch (error) {
    console.log('/getMealBookingsByDateAggregation', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});


router.post('/getBookingForAllEmployees', authAdmin , async (req,res) =>{
  try {

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);


    // $gte  1 dec  $lte 31st dec    $eq   $lt
    // 1st dec - 31st dec






    const meals = await Meal.aggregate([
      {
        $match: {
          $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }, { type: EMPLOYEE }]
        }
      },
      {
        $lookup: {
          from: 'users', // assuming your User collection is named 'users'
          localField: 'employeeId',
          foreignField: 'employeeId',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $group: {
          _id: '$employeeId',
          userName: { $first: '$user.firstName' },
          department: { $first: '$user.department' },
          date: { $push: '$date' }
        }
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          department: 1,
          date: 1,
          total: { $size: '$date' }
        }
      }
    ]);
    


    res.status(200).send({ data : meals, message : 'Meal by date aggregation get sucessfully' });
  } catch (error) {
    console.log('/getBookingForAllEmployees', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});


router.post('/getBookingForOthers', authAdmin, async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const meals = await Meal.aggregate([
      {
        $match: {
          $and: [
            { date: { $gte: startDate } },
            { date: { $lte: endDate } },
            {
              $or: [
                { type: NON_EMPLOYEE },
                { type: CUSTOM }
              ]
            }
          ]
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            type: '$type'
          },
          meals: {
            $push: {
              type: '$type',
              mealtype: '$mealType', // Include the meal type field here
              count: '$count',
              notes: '$notes'
            }
          },
          mealCount: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          meals: {
            $push: '$meals'
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({ success: true, data: meals });
  } catch (error) {
    console.error('/getBookingForOthers', error);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
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

const getDisabledDateFormatted = (disabledDates) => {
  let dates = [];

  for (let i = 0; i < disabledDates.length ; i++){
    const d = moment(disabledDates[i].date)
    dates.push(d.format('YYYY-MM-DD'))
  }
 
  return dates;
}

const getFinalDates = (dates,disabledDates) => {
 let newDates = dates.filter((item) => !disabledDates.includes(item));
 
  return newDates;
}


const createMealBookingValidationSchema = () => {
  const schema = Joi.object({
    startDate : Joi.string().required().label('Start Date'),
    endDate : Joi.string().required().label('End Date'),
    type : Joi.string().required().valid('employee', 'non-employee', 'custom').label('Type'),
    mealType : Joi.string().required().valid('lunch', 'dinner', 'custom').label('Type'),
    employeeIds : Joi.array().items(Joi.string()),
    count : Joi.number(),
    notes : Joi.string()
  });
  return schema;
}

module.exports = router;