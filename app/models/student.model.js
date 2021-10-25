const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {

      studentID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,
        autoIncrement: true,

        
      },        
      advisorID: {
        type: DataTypes.INTEGER
      },
      degreeID: {
        type: DataTypes.INTEGER
      },
      fName: {
        type: Sequelize.STRING
      },
      lName: {
        type: Sequelize.STRING
      },
      major:{
        type: DataTypes.STRING
      },
      grad_date:{
        type: DataTypes.DATE
      },
      email: {
        type: Sequelize.STRING
      },
    },
    {
      tableName: 'students'
    
  });
  
    return Student;
  };