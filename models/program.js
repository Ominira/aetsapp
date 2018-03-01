'use strict';
module.exports = (sequelize, DataTypes) => {
  var Program = sequelize.define('Program', {
    program_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    program_desc_short: {
      type: DataTypes.STRING
    },
    program_desc_long: {
      type: DataTypes.STRING
    }
  },{
      tableName: 'program',
      timestamps: false
  });

  return Program;
};