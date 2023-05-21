const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

async function auth(req, res, next) {
    const token = req.header('Authorization');
    // const token = req.cookies.usercookie;

    if(!token) return res.status(400).send({ error : 'Bad Request', message : "Pleave provide authentication token" });
    
    try{
      var decodeId = jwt.decode(token);
      let user = await User.findOne({ _id : decodeId._id ,"tokens.token" : token }).select('-password');
      // console.log(user);
      if(!user) return res.status(404).send({ mesasge : "Invalid Credentials" });
      if(user.role != 'admin') return res.status(400).send({ error : 'Invalid Credentials' , message : 'You are not admin.' });
      if(!user.enabled) return res.status(400).send({ error : 'Invalid Credentials' , message : 'You are not authorised to perform this opertaion. auth middleware . contact Admin' });
      req.user = user;
      next();
    }catch(error){
      return res.status(408).send({ error : 'Request timed-out' , messasge : "Access denied. Invalid token" });
    }
}

module.exports  = auth;