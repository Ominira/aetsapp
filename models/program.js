'use strict';
module.exports = (sequelize, DataTypes) => {
  var Program = sequelize.define('Program', {
    programId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'program_id',
      autoIncrement: true
    },
    programDescriptionShort: {
      type: DataTypes.STRING,
      field: 'program_desc_short'
    },
    programDescriptionLong: {
      type: DataTypes.STRING,
      field: 'program_desc_long'
    }
  },{
      tableName: 'program',
      timestamps: false
  });

  Program.associate = function(models) {
    models.Program.hasMany(models.Student,{
      foreignKey: 'studentProgram',
      sourceKey: 'programId'
    })
  };

  Program.sync();

  return Program;
};