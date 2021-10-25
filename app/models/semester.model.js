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
        type: DataTypes.DATEONLY
      },
      endDate:{
        type: DataTypes.DATEONLY
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