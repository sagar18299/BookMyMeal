const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

async function auth(req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(400).send({ error : 'Bad Request', message : "Pleave provide authentication token" });
    
    try{
      var decodeId = jwt.decode(token);
      let user = await User.findOne({ _id : decodeId._id }).select('-password');
      if(!user) return res.status(404).send({ mesasge : "Invalid Credentials" });
      if(user.role != 'employee') return res.status(400).send({ error : 'Invalid Credentials' , message : 'You are not employee.' });
      if(!user.enabled) return res.status(400).send({ error : 'Invalid Credentials' , message : 'You are not authorised to perform this opertaion. auth middleware . contact Admin' });
      req.user = user;
      next();
    }catch(error){
      return res.status(408).send({ error : 'Request timed-out' , messasge : "Access denied. Invalid token" });
    }
}

module.exports  = auth;