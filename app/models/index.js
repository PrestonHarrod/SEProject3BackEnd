const dbConfig = require("../config/db.config.js");
//const authJwt = require("../controllers/util.controller.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admins = require("./admin.model.js")(sequelize, Sequelize);
db.advisors = require("./advisor.model.js")(sequelize, Sequelize);
db.courses = require("./course.model.js")(sequelize, Sequelize);
db.degrees = require("./degree.model.js")(sequelize, Sequelize);
db.degreeCourses = require("./degreeCourse.model.js")(sequelize, Sequelize);
db.semesters = require("./semester.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);
db.studentCourses = require("./studentCourse.model.js")(sequelize, Sequelize);
db.sessions = require('./session.model.js')(sequelize, Sequelize);

db.roles = ["admin", "advisor", "student"]; //our roles
//add has associations here
db.courses.hasMany(db.studentCourses, {
  as: 'studentcourse'
});

db.studentCourses.belongsTo(db.courses, {
  foreignKey: 'courseID'
})

db.students.hasMany(db.studentCourses, {
  as: 'studentcourse'
});
db.semesters.hasMany(db.studentCourses, {
  as: 'studentcourse'
});
db.studentCourses.belongsTo(db.semesters, {
  foreignKey: 'semesterID'
});

db.advisors.hasMany(db.students, {as: "students"});
db.students.belongsTo(db.advisors, {
  foreignKey: "advisorID",
  as: "advisor",
});

db.students.hasMany(db.studentCourses, {as: "studentCourses"});
db.studentCourses.belongsTo(db.students, {
  foreignKey: "studentID",
  as: "student",
});

db.degrees.hasMany(db.degreeCourses, {as: "degreeCourses"});
db.degreeCourses.belongsTo(db.degrees, {
  foreignKey: "degreeID",
  as: "degree",
});

db.courses.belongsToMany(db.semesters, {
  through: "semester_course", 
  as: "semesters",
  foreignKey: "semesterID"
});

db.semesters.belongsToMany(db.courses, {
  through: "semester_course", 
  as: "courses",
  foreignKey: "courseID"
});

db.courses.hasMany(db.degreeCourses, {
  as: 'degreecourse'
});
db.degreeCourses.belongsTo(db.courses, {
  foreignKey: 'courseID'
});
db.degrees.hasMany(db.degreeCourses, {
  as: 'degreecourse'
});
db.degreeCourses.belongsTo(db.degrees, {
  foreignKey: 'degreeID'
});

db.degrees.hasMany(db.students, {
  as: 'student'
});
db.students.belongsTo(db.degrees, {
  foreignKey: 'degreeID'
});

module.exports = db

