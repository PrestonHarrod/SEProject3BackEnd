const db = require("../models");
const Session = db.sessions;
const Advisor = db.advisors;
const Student = db.students;
const Op = db.Sequelize.Op;
const authcofig = require('../config/auth.config.js');


//var jwt = require("jsonwebtoken");
const { advisor } = require("../models");

// Login and create Session
exports.login = async (req, res) => {

  if (!req.body.accessToken) {
    console.log("accessToken");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

// get Google Info
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client('738583612295-7lvrgo65m2qnpq05eg20turnoamher1l.apps.googleusercontent.com');
  const ticket = await client.verifyIdToken({
    idToken: req.body.accessToken,
    audience: '738583612295-7lvrgo65m2qnpq05eg20turnoamher1l.apps.googleusercontent.com'
  });
  const payload= ticket.getPayload();
  console.log('Google payload is '+JSON.stringify(payload));
  const userid = payload['sub'];
  let email = payload['email'];
  let emailVerified = payload['email_verified'];
  let name = payload["name"];
  let pictureUrl = payload["picture"];

  let user = {};
  let token = null;

// get User by email
  console.log("search Advisor");
  let  foundUser = false;
  await Advisor.findOne({
    where : {email:email}
  })
  .then(data => {
    if (data != null) {
      let advisor= data.dataValues;
      token = jwt.sign({ id: advisor.email }, authcofig.secret, {expiresIn: 86400}); // 24 hours
      user.email = advisor.email;
      user.advisorID = advisor.id;
      user.studentID = null;
      user.userID = advisor.id;
      user.fName = advisor.fName;
      foundUser = true;

    }
    }).catch(err => {
        console.log("Error 1");
        res.status(401).send({
          message: err.message || "Error looking up User"
        });
        return;
    });
      console.log("student search");
      await Student.findOne({
        where : {email:email}
      }
      )
      .then(data => {
        if (data != null) {         
            let student = data.dataValues;
            token = jwt.sign({ id: student.email }, authcofig.secret, {expiresIn: 86400}); // 24 hours
            user.email = student.email;
            user.advisorID = null;
            user.studentID = student.id;
            user.userID  = student.id;
            user.fName = student.fName;
            foundUser = true;
         }

      }).catch(err => {
        console.log("Error 1");
        res.status(401).send({
          message: err.message || "Count not find user"
       });
        return;
    });
    console.log()
    if (!foundUser) {
      res.status(401).send({
        message: "User Not Found"
      });
      return;
    }
// Create a Session
  let tokenExpireDate =new Date();
  tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);
  const session = {
    token: token,
    email: user.email,
    advisorId : user.advisorID,
    studentId : user.studentID,
    expireDate: tokenExpireDate
  };

  // Save Session in the database
  Session.create(session)
    .then(data => {
      let userInfo = {
        user : user.fName,
        studentId : user.studentID,
        advisorId: user.advisorID,
        userId : user.userID,
        token : session.token
      };

      res.send(userInfo);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Session."
      });
    });
  }

exports.logout = async (req, res) => {
    return;
};