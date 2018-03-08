'use strict';

module.exports = (sequelize, DataTypes) => {
    const Hall = sequelize.define('Hall',{
        hallId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'hall_id'
        },
        hallDescriptionShort: {
            type: DataTypes.STRING,
            field: 'hall_desc_short'
        },
        hallDescriptionLong: {
            type: DataTypes.STRING(400),
            field: 'hall_desc_long'
        },
        hallCapacity: {
            type: DataTypes.INTEGER,
            field: 'hall_capacity'
        },
        hallAvailableCapacity: {
            type: DataTypes.INTEGER,
            field: 'hall_available_capacity'
        },
        hallAvailable: {
            type: DataTypes.BOOLEAN,
            field: 'hall_available',
            defaultValue: true
        },
        hallZone: {
            type: DataTypes.INTEGER,
            field: 'hall_zone',
            allowNull: false,
            references: {
                model: 'zone',
                key: 'zone_id'
            }     
        }
    },{
        tableName: 'hall',
        paranoid: true
    });

    Hall.associate = function(models) {
        models.Hall.belongsTo(models.Zone,{
            foreignKey: 'hallZone',
            targetKey: 'zoneId'
        });
    };

    Hall.sync();

    return Hall;
}