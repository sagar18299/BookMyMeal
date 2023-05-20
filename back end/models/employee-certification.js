const mongoose = require('mongoose');

const employeeCertificationSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  passingYear : {
    type : Number,
    required : true
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : 'User'
  },
  updatedBy : {
    type : mongoose.Schema.Types.ObjectId,
    required : false
  }
}, { timestamps : true });

const EmployeeCertification = mongoose.model('EmployeeCertification', employeeCertificationSchema);

module.exports.EmployeeCertification = EmployeeCertification;