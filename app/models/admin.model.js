//const { DataTypes } = require("sequelize/types");
const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
       
      adminID: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false
      },
      advisorID: {
        type: DataTypes.INTEGER
      },
      username:{
        type: DataTypes.STRING
      },
      fName:{
        type: DataTypes.STRING
      },
      lName:{
        type: DataTypes.STRING
      },
      email:{
        type: DataTypes.STRING
      },
      dept:{
        type: DataTypes.STRING
      },
      role:{
        type: DataTypes.STRING
      }
    },
      {
        tableName: 'admins'
      
    });
  
    return Admin;
  };