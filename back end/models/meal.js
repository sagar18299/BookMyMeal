
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  type : {
    type : String,
    required : true,
    enum : ['employee','non-employee','custom']
  },
  employeeId : {
    type : String,
    ref : 'User'
  },
  date : {
   type : mongoose.Schema.Types.Date,
   required : true
  },
  count : {
    type : Number,
    required : false
  },
  mealType : {
    type : String,
    required : true,
    enum : ['lunch','dinner']
  },
  notes : {
    type : String,
    required : false
  },
  
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  updatedBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : false
  },
  disabled : {
    type : Boolean,
    required : false  
  },
  disabledDescription : {
    type : String,
    required  : false
  },
  disabledBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : false,
    ref : 'User'
  },
  disabledAt : {
    type : Date,
    required : false
  },
  reedem : {
    type : Boolean,
    default : false
    
  },
  cancel : {
    type : Boolean,
    default : false
    
  },
  
}, { timestamps : true });

const Meal = mongoose.model('meal', mealSchema);

module.exports.Meal = Meal;