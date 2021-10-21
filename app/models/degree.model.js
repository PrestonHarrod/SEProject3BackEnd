const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Degree = sequelize.define("degree", {


      degreeID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,
        autoIncrement: true,
      },
      dept: {
        type: Sequelize.STRING
      },
      degree: {
        type: Sequelize.STRING
      },
      hours:{
        type: DataTypes.INTEGER
      },
    },
    {
      tableName: 'degree'
    
  });
  
    return Degree;
  };