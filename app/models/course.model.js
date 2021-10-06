const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
       
      courseID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,
      },
      semesterID: {
        type: DataTypes.INTEGER
      },
      dept:{
        type: DataTypes.STRING
      },
      courseNum:{
        type: DataTypes.STRING
      },
      desc:{
        type: DataTypes.STRING
      },
      hours:{
        type: DataTypes.INTEGER
      },
      level:{
        type: DataTypes.STRING
      },
    },
    {
      tableName: 'course'
    
  });
  
    return Course;
  };