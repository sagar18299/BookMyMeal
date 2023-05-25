const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Meal2 } = require('../models/meal2');
const { Calendar } = require('../models/calendar');
const Joi = require('joi');
const authAdmin = require('../middlewares/auth-admin');
const moment = require('moment');
const _ = require('lodash');

router.post('/createMeal2Bookings', authAdmin , async (req,res) =>{
  try {
    //validation joi
    const { error , value  } = createMeal2BookingValidationSchema().validate(req.body, { abortEarly : false });
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
      
          let meal2 = await Meal2.findOne(data);
          if(!meal2) {
            // fresh insert
            meal2 = new Meal2({
              mealType : req.body.mealType,
              type : req.body.type ,
              date : new Date(date).toISOString(),
              employeeId : emp,
              createdBy : req.user._id
            });
  
            if(req.body.count){
              meal2.count = req.body.count
            }
          }
          meal2 = await meal2.save();
        }
    }else{

      const data = { mealType : req.body.mealType ,  type : req.body.type , date : new Date(date).toISOString() };
      let meal2 = await Meal2.findOne(data);
      // if(!meal2) {
      //   if(req.body.count) {
        
      //   meal2 = new Meal2({
      //     mealType : req.body.mealType,
      //     type : req.body.type ,
      //     date : new Date(date).toISOString(),
      //     count : req.body.count,
      //     createdBy : req.user._id
      //   });
      //   meal2 = await meal2.save();
      // }}else {
      //   meal2 = new Meal2({
      //     mealType : req.body.mealType,
      //     type : req.body.type ,
      //     date : new Date(date).toISOString(),
      //     count : req.body.count,
      //     createdBy : req.user._id
      //   });
      //   meal2 = await meal2.save();
      // }
      // console.log(req.body);
      meal2 = new Meal2({
        mealType : req.body.mealType,
        type : req.body.type ,
        date : new Date(date).toISOString(),
        count : req.body.count,
        notes : req.body.notes,
        createdBy : req.user._id
      });
      meal2 = await meal2.save();
    }
  }
    res.status(200).send({ data : finalDates,message : 'Meal2 added sucessfully' });
  } catch (error) {
    console.log('/createNewUser', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.post('/getMeal2BookingsByDate', authAdmin , async (req,res) =>{
  try {
    const date = new Date(req.body.date);
    const meals = await Meal2.find({ date : date.toISOString() });

    // internally logic 

    res.status(200).send({ data : meals, message : 'Meal2 by date get sucessfully' });
  } catch (error) {
    console.log('/createNewUser', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.post('/getMeal2BookingsByDateAggregation', authAdmin , async (req,res) =>{
  try {
    const date = new Date(req.body.date);
    const meals = await Meal2.aggregate([
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

    res.status(200).send({ data : meals, message : 'Meal2 by date aggregation get sucessfully' });
  } catch (error) {
    console.log('/createNewUser', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});


router.post('/getBookingForAllEmployees', authAdmin , async (req,res) =>{
  try {

    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);


    // $gte  1 dec  $lte 31st dec    $eq   $lt
    // 1st dec - 31st dec






    const meals = await Meal2.aggregate([
      {
        $match: {
          $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }, { type: 'employee' }]
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
          deparment: { $first: '$user.department' },
          date: { $push: '$date' }
        }
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          deparment: 1,
          date: 1,
          total: { $size: '$date' }
        }
      }
    ]);
    

    // const meals = await Meal2.aggregate([
    //   {
    //     $match : { $and: [{ date  :  { $gte : startDate } }, { date  :  { $lte : endDate } },  {  type : 'employee'  }]}    
    //   },
    //   {
    //     $group : {
    //       _id : "$employeeId",
    //       date : { $push : "$date" }
    //     }
    //   },
      
    //   {
    //     $project : {
    //       _id : 1,
    //       date : 1,
    //       total : { $size : "$date" }
    //     }
    //   }
    // ])
    res.status(200).send({ data : meals, message : 'Meal2 by date aggregation get sucessfully' });
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


const createMeal2BookingValidationSchema = () => {
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