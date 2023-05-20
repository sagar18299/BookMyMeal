const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Meal2 } = require('../models/meal2');
const { Calendar } = require('../models/calendar');
const Joi = require('joi');
const auth = require('../middlewares/auth');
const moment = require('moment');
const _ = require('lodash');

router.post('/redeemMealCoupon', auth , async (req,res) =>{
  try {
      // req validation using joi 
      let meal = await Meal2.findOne({ date : new Date(req.body.date),employeeId : req.body.employeeId });
      if(meal){
        meal.reedem="true";
        
      }

      meal = await meal.save();



      // if( req.body.couponType == 'employee'){
      //   if(req.body.mealType == 'lunch'){
      //       const index = meal.lunchEmployees.indexOf(req.body.employeeId);
      //       if(index < 0) return res.status(400).send({ message : `Employee ${req.body.employeeId} not found for lunch ` }) ;
      //       const reedemIndex = meal.reedemLunchEmployees.indexOf(req.body.employeeId);
      //       if(reedemIndex >= 0) return res.status(400).send({ message : `Employee ${req.body.employeeId} Coupon already reedem for lunch` }) ;
      //       meal.reedemLunchEmployees.push(req.body.employeeId);
      //       meal = await meal.save();
      //       return res.status(200).send({ message : `Employee ${req.body.employeeId} Coupon reedem successfully.` }) ;
      //   }else if (req.body.mealType == 'dinner'){
          
      //   }
      // }else {
      //   // manage non employee
      // }
    return res.status(200).send({ meal, message : 'Meal data get sucessfully' });
  } catch (error) {
    console.log('/redeemMealCoupon', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

module.exports = router;