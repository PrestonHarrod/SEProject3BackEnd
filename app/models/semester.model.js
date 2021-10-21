const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Semester = sequelize.define("semester", {
       

      semesterID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,
        autoIncrement: true,

      },
      startDate:{
        type: DataTypes.DATE
      },
      endDate:{
        type: DataTypes.DATE
      },
      season:{
        type: DataTypes.STRING
      },
    },
    {
      tableName: 'semester'
    
  });
  
    return Semester;
  };