
const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  date : {
    type : Date,
    required : true,
  },
  description : {
    type : String,
    required : true
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  updatedBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : false,
    ref : 'User'
  }
}, { timestamps : true });

const Calendar = mongoose.model('calendar', calendarSchema);

module.exports.Calendar = Calendar;