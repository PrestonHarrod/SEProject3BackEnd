const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { sessions } = require("../models");
const db = require("../models");
const Admin = db.admins;
const Advisor = db.advisors;
const Student = db.students;
const Session = db.sessions;

//authorization method. Authenticates 

authenticate = (req, res, next) => {
  let authheader = req.get("authorization");
  if (authheader!=null) //we need to make sure that the authheader is not null
  {
    if (authheader.startsWith("Bearer ")){ //dont accept a header that 
      let token = authHeader.substring(7, authHeader.length);
      jwt.verify(token, config.secret), (err, decoded) => { //verify the token
        if (err){
          return res.json({
            success:false,
            message: 'token is not valid'
          })
        }
      }
      //find the session with the same token, sessions are created in the auth controller when one is logged in
      Session.findOne({
        where : {token:token}
      })
      .then(data=> {
        let session = data.dataValues;
        if (session != null)
        {
          //check to see if the session is expired
          if (session.expireDate > Date.now())
          {
            next();
            return;
          }
          else{
            return res.status(401).send({
              message: "error: token is expired"
            })
          }
         
        }
        else{
          return res.status(404).send({
            message: "error: cannot find session with token"
          })
        }

      })
      
    }
    else{
      //Error
    }

  }
}


//same as authenticate but the .then => data is different. make sure the advisor.role is advisor
isAdmin = (req, res, next) => {
  let authheader = req.get("authorization");
  if (authheader!=null) //we need to make sure that the authheader is not null
  {
    if (authheader.startsWith("Bearer ")){ //dont accept a header that 
      let token = authHeader.substring(7, authHeader.length);
      jwt.verify(token, config.secret), (err, decoded) => { //verify the token
        if (err){
          return res.json({
            success:false,
            message: 'token is not valid'
          })
        }
      }
      //find the session with the same token, sessions are created in the auth controller when one is logged in
      Session.findOne({
        where : {token:token}
      })
      .then(data=> {
        //check to see if session has the admin
        let session = data.dataValues;
        if (session!= null)
        {
          //find the adminID in the session
          if(session.adminID != null){
            Admin.findByPk(session.adminID)
            .then(data => {
              if(data.dataValues.role = "Admin")
              {
                next();
                return;
              }
              else {
                //error
              }

            })
          }
        }
       })
      
    }
    else{
      //Error
    }

  }
}

isAdvisor = (req, res, next) => {
  let authheader = req.get("authorization");
  if (authheader!=null) //we need to make sure that the authheader is not null
  {
    if (authheader.startsWith("Bearer ")){ //dont accept a header that 
      let token = authHeader.substring(7, authHeader.length);
      jwt.verify(token, config.secret), (err, decoded) => { //verify the token
        if (err){
          return res.json({
            success:false,
            message: 'token is not valid'
          })
        }
      }
      //find the session with the same token, sessions are created in the auth controller when one is logged in
      Session.findOne({
        where : {token:token}
      })
      .then(data=> {
        //check to see if session has the admin
        let session = data.dataValues;
        if (session!= null)
        {
          //find the advisorID in the session
          if(session.advisorID != null){
            Admin.findByPk(session.advisorID)
            .then(data => {
              if(data.dataValues.role = "Advisor")
              {
                next();
                return;
              }
              else {
                //error
              }

            })
          }
        }
       })
      
    }
    else{
      //Error
    }

  }
}



 


//checks to see if they are an advisor or an admin, how do I include each?



//how do I check for any role?


const authJwt = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isAdvisor: this.isAdvisor,
  isAdminOrAdvisor: isAdminOrAdvisor,
  isAny: isAny
  
};
module.exports = authJwt;