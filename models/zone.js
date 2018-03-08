'use strict';

module.exports = (sequelize, DataTypes) => {
    const Zone = sequelize.define('Zone',{
        zoneId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'zone_id'
        },
        zoneDescription: {
            type: DataTypes.STRING,
            field: 'zone_desc'
        }
    },{
        tableName: 'zone',
        timestamp: true,
        paranoid: true
    });

    Zone.associate = function(models) {
        models.Zone.hasMany(models.Hall,{
            foreignKey: 'hallZone',
            sourceKey: 'zoneId'
        });
    }

    Zone.sync();
    return Zone;
};