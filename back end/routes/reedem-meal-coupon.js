const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Meal } = require('../models/meal');
const { Calendar } = require('../models/calendar');
const Joi = require('joi');
const auth = require('../middlewares/auth');
const moment = require('moment');
const _ = require('lodash');

router.post('/redeemMealCoupon', auth , async (req,res) =>{
  try {
      
      let meal = await Meal.findOne({ date : new Date(req.body.date),employeeId : req.body.employeeId });
      if(meal){
        if(meal.cancel="false"){
          meal.reedem="true"
        }
        else{
          res.send("invalid meal")
        }
        
      }
      

      meal = await meal.save();


    return res.status(200).send({ meal, message : 'Meal data get sucessfully' });
  } catch (error) {
    console.log('/redeemMealCoupon', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.post('/cancelMealCoupon', auth , async (req,res) =>{
  try {
      
      let meal = await Meal.findOne({ date : new Date(req.body.date),employeeId : req.body.employeeId });
      if(meal){
        meal.cancel="true";
      }
      meal = await meal.save();

    return res.status(200).send({ meal, message : 'Meal data get sucessfully' });
  } catch (error) {
    console.log('/cancelMealCoupon', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

module.exports = router;