const db = require("../models");
const Advisor = db.advisors;
const Session = db.sessions;
const Student = db.student;
const authconfig = require('../config/auth.config.js');
const Op = db.Sequelize.Op;

// Log into the system
exports.login = (req, res) => {
    // Validate request
    if (!req.body.accessToken) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  

    //Google code 
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client('xxxxxxxxxxxxx.apps.googleusercontent.com');
    const ticket = await client.verifyIdToken({
      idToken: inputs.accessToken,
      audience: 'xxxxx.apps.googleusercontent.com'
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
    //find the user 
    //Find advisor

    await Advisor.findOne({
        where : {email:email}
      })
      .then(data => {
        if (data != null) {
          let advisorData= data.dataValues; 
          token = jwt.sign({ id: advisor.email }, authcofig.secret, {expiresIn: '24h'}); //JWT translates that to 24 hours. 1d also works for 1 day
          user.userId = advisor.advisorID; //using 
          user.email = advisorData.email;
          user.firstName = advisor.firstName;
          user.advisorID = advisorData.advisorID;
          user.studentID = null; //since this is an advisor
        }
        }).catch(err => {
            console.log("Error 1");
            res.status(401).send({
              message: err.message || "Error looking up advisor"
            });
            return;
        });

        //find the student
        await Student.findOne({
            where : {email:email}
          })
          .then(data => {
            if (data != null) {
              let studentData= data.dataValues; 
              token = jwt.sign({ id: advisor.email }, authcofig.secret, {expiresIn: '24h'}); //JWT translates that to 24 hours. 1d also works for 1 day
              user.email = studentData.email;
              user.firstName = studentData.firstName;
              user.advisorID = null;
              user.studentID = Studentdata.StudentID; //since this is an advisor
              user.userId = studentData.studentID; //using
            }
            }).catch(err => {
                console.log("Error 1");
                res.status(401).send({
                  message: err.message || "Error looking up advisor"
                });
                return;
            });



    //create a 24 hour date for the session
    let expDate = new Date();
    expDate.setDate(expDate.getDate() + 1); //plus one is 24 hours
  
    // Create a session
    const session = {
        token: token,
        email: user.email,
        advisorID: user.advisorID,
        expireDate: expDate
    };

      //put the newely created session in the db
      Session.create(session)
      .then(data => {
        let userData = {
          user : userData.firstName,
          userId : userData.userID,
          studentId : userData.studentID,
          advisorId: userData.advisorID,
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

