const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const StudentCourse = sequelize.define("studentCourse", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,

     },
      studentID: {
        type: DataTypes.INTEGER
      },        
      courseID: {
        type: DataTypes.INTEGER
      },
      semesterID: {
        type: DataTypes.INTEGER
      },
      grade: {
        type: DataTypes.CHAR(1)
      },
      status: {
        type: DataTypes.STRING
      },
    },
    {
      tableName: 'studentCourse'
    
  });
  
    return StudentCourse;
  };