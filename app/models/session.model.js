const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    //session needs an ID, token, Advisor/StudentID, and expireDate, 
    const Session = sequelize.define("session", {
      sessionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      advisorId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: true
      }, 
      expireDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, 
    {
      tableName: 'session'
    });
    return Session;
  };