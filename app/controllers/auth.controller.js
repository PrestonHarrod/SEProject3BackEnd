const db = require("../models");
const Session = db.sessions;
const Advisor = db.advisors;
const Student = db.students;
const Op = db.Sequelize.Op;

const { advisor } = require("../models");
exports.login = async (req, res) => {

  if (!req.body.accessToken) {
    console.log("accessToken");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // code from word doc to authenticate token from frontend
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client('738583612295-7lvrgo65m2qnpq05eg20turnoamher1l.apps.googleusercontent.com');
  const ticket = await client.verifyIdToken({
    idToken: req.body.accessToken,
    audience: '738583612295-7lvrgo65m2qnpq05eg20turnoamher1l.apps.googleusercontent.com'
  });
  const payload= ticket.getPayload();
  console.log('Google payload is '+JSON.stringify(payload));
  let email = payload['email'];

  let user = {};

  // Look for an advior in the database
  let userFound = false;
  await Advisor.findOne({ where : {email:email}})
    .then(data => {
        if (data != null) {
        let advisor= data.dataValues;
        user.email = advisor.email;
        user.advisorID = advisor.advisorID;
        user.studentID = null;
        user.userID = advisor.advisorID;
        user.fName = advisor.fName;
        userFound = true;

        }
    }).catch(err => {
        res.status(401).send({
          message: err.message || "Error looking up User"
        });
        return;
    });

    // Look for a student in the database
    //comment
      await Student.findOne({where : {email:email}
      })
      .then(data => {
        if (data != null) {         
            let student = data.dataValues;
            user.email = student.email;
            user.advisorID = student.advisorID;
            user.studentID = student.studentID;
            user.userID  = student.studentID;
            user.fName = student.fName;
            userFound = true;
         }

      }).catch(err => {
        res.status(401).send({
          message: err.message || "Count not find user"
       });
        return;
    });
    console.log()
    if (!userFound) {
      res.status(401).send({
        message: "User Not Found"
      });
      return;
    }
  let tokenExpireDate =new Date();
  tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);
  const session = {
    token: req.body.accessToken,
    email: user.email,
    advisorId : user.advisorID,
    studentId : user.studentID,
    expireDate: tokenExpireDate
  };

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