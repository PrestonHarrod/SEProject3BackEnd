const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const DegreeCourse = sequelize.define("degreeCourse", {
     id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        unique: true,
        allowNull: false,

     },
      courseID: {
        type: DataTypes.INTEGER
      },
      degreeID: {
        type: DataTypes.INTEGER
      },
    },
    {
      tableName: 'degreeCourse'
    
  });
  
    return DegreeCourse;
  };