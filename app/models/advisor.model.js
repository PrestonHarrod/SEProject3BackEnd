const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Advisor = sequelize.define("advisor", {
      advisorID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
        allowNull: false
      },
      fName: {
        type: Sequelize.STRING
      },
      lName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      dept:{
        type: DataTypes.STRING
      }

      },
      {
        tableName: 'advisors'
      
    });
      
  
    return Advisor;
  };