const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { EmployeeCertification } = require('../models/employee-certification');
const auth = require('../middlewares/auth');


router.post('/createNewCertification', auth , async (req,res) =>{
  try {
    // joi implementaion for req validation 

    let employeeCertification = new EmployeeCertification({
      title : req.body.title,
      description : req.body.description,
      passingYear : req.body.passingYear,
      user : req.user._id,
      createdBy : req.user._id
    });


    employeeCertification = await employeeCertification.save();

    let user = await User.findOne({ _id : req.user._id });
    if(user) {
      user.certifications.push(employeeCertification._id);
    }
    user = await user.save();

    res.status(200).send({ message : 'Certification added successfully.', data : { employeeCertification : employeeCertification  }  });
  } catch (error) {
    console.log('/loginEmployee', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.post('/getAllEmployeeCertifications', auth , async (req,res) =>{
  try {
    // joi pagination request validation task 
    const pageOptions = {
      page : req.body.pageNo,
      limit : req.body.limit
    }
    const certifications = await EmployeeCertification.find({}).populate('user', 'email').sort({  createdAt : -1 }).skip((pageOptions.page - 1 ) * pageOptions.limit).limit(pageOptions.limit);
    res.status(200).send({ message : 'Certification added successfully.', data : { employeeCertifications : certifications  }  });
  } catch (error) {
    console.log('/loginEmployee', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.post('/getAllEmployeeCertificationsAggregation', auth , async (req,res) =>{
  try {
    // 100000 

    const certifications = await EmployeeCertification.aggregate([
      {
        $match : { "title": "Python" } 
      },
      {
        $lookup : {
          from: "users",
          localField : "user",
          foreignField : "_id",
          as : "employee"
        }
      },
      {
        $unwind : "$employee"
      },
      {
        $group : {
          _id: "$passingYear",
          certifications : { $push : "$$ROOT" }, 
          count : { $sum : 1}
        }
      },
      {
        $skip : 2
      },
      {
        $limit : 10 
      },
      {
        $sort : {
          _id : 1
        }
      }
    ]);
    res.status(200).send({ message : 'Certification added successfully.', data : { employeeCertifications : certifications  }  });
  } catch (error) {
    console.log('/loginEmployee', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

// data.employee[0].eam


module.exports = router;