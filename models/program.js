'use strict';
module.exports = (sequelize, DataTypes) => {
  var Program = sequelize.define('program', {
    
  },{
      tableName: 'program'
  });

  return Program;
};