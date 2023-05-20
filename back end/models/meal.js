const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
  empId : {
    type : String,
    required : true
  },
  coupon : {
    type : String,
    required : true
  }
});

const nonEmpSchema = new mongoose.Schema({
  count : {
    type : String,
    required : true
  },
  reason : {
    type : String,
    required : false
  }
});

const customeEmpSchema = new mongoose.Schema({
  count : {
    type : String,
    required : true
  },
  category : {
    type : String,
    required : true
  },
  reason : {
    type : String,
    required : true
  }
},{ timestamps : true });

const mealSchema = new mongoose.Schema({
  date : {
   type : mongoose.Schema.Types.Date,
   required : true,
   unique : true
  },
  lunchEmployees : {
    type : [Number]
  },
  dinnerEmployees : {
    type : [Number]
  },
  nonEmployees : {
    type : [Number]
  },
  custom  : {
    type : [Number],
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : false,
    ref : 'User'
  },
  disable : {
    date : {
      type : Date,
      required : false
    },
    reason : {
      type :String ,
      required :false
      }
  },
  reedemLunchEmployees : {
    type : [Number],
    default : []
  },
  updatedBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : false
  }
}, { timestamps : true });

const Meal = mongoose.model('Meal', mealSchema);

module.exports.Meal = Meal;