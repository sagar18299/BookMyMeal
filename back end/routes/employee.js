const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.post('/login', async (req,res) =>{
  try {

    let user = await User.findOne({ email : req.body.email });

    if(!user) return res.status(404).send({ mesasge : "Invalid Credentials" });
    if(!user.password) return res.status(400).send({ mesasge : "Invalid Credentials " });
    // valid password
    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if(!validPassword) return res.status(400).send({ error : 'Invalid Credentials' , message : 'Please provide valid credentials' });
    // check user is enable or not
    if(!user.enabled) return res.status(400).send({ error : 'Invalid Credentials' , message : 'You are not authorised to perform this opertaion. contact Admin' });

    // main login
    const token = generateAuthToken(user);
    //
    // console.log(token);
    user.tokens = await user.tokens.concat({ token });
    await user.save();
    
    res.cookie("usercookie",token,{
      expires:new Date(Date.now()+9000000),
      httpOnly:true
  });

    res.status(200).send({ data : { token : token, email : user.email }, message : 'User loggin sucessfully.' });
  } catch (error) {
    console.log('/loginEmployee', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.get('/getMyProfile', auth ,async (req,res) =>{
  try {
    const user = await User.findOne({ _id : req.user._id }).select('-password').populate('createdBy', '_id firstName lastName email').populate('certifications');
    return res.status(200).send({ data :  { user : user } });
  } catch (error) {
    console.log('/getMyProfile', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

router.get('/updateMyProfile', async (req,res) =>{
  try {
    const token = req.header('Authorization');
    if(!token) return res.status(400).send({ error : 'Bad Request', message : "Pleave provide authentication token" });
    
    var decodeId = jwt.decode(token);
    let user = await User.findOne({ _id : decodeId._id }).select('-password');
    if(!user) return res.status(404).send({ mesasge : "Invalid Credentials" });
    if(!user.enabled) return res.status(400).send({ error : 'Invalid Credentials' , message : 'You are not authorised to perform this opertaion. contact Admin' });
    return res.status(200).send({ data :  { user : user } });

  } catch (error) {
    console.log('/getMyProfile', error);
    return res.status(500).send('something went wrong. please try after some time');
  }
});

function  generateAuthToken(user) {
  const token = jwt.sign({ _id : user._id }, '33NSY8hdQD1aaser234', { expiresIn : '10d' }, { algorithm : 'RS256' });
  return token;
}

module.exports = router;