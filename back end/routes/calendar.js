const express = require('express');
const router = express.Router();
const { Calendar } = require('../models/calendar');
const { Meal2 } = require('../models/meal2');
const auth = require('../middlewares/auth-admin');


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

    const meals = await Meal2.aggregate([
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

    // disabled user 
    await Meal2.updateMany({ date : date } , { $set : { disabled : true, disabledDescription : req.body.description } });
  
    // get the employee ids in array to send email for disabled date
    
    // email
    res.status(200).send({ message : 'Disabled date added into calendar.', data : { calendar , meals  }});
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
    const caledarDates = await Calendar.find({}).sort({ createdAt : -1 }).skip((pageOptions.page - 1 ) * pageOptions.limit).limit(pageOptions.limit);
    res.status(200).send({ message : 'disabled dates get successfully.', data : { caledarDates }  });

  } catch (error) {
    console.log('/getAllCalendarDates', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});


module.exports = router;