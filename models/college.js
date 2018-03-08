'use strict';

module.exports = (sequelize, DataTypes) => {
    const College = sequelize.define('College',{
        collegeId: {
            type: DataTypes.CHAR(10),
            primaryKey: true,
            field: 'college_id'
        },
        collegeDescriptionShort: {
            type: DataTypes.STRING,
            field: 'college_desc_short'
        },
        collegeDescriptionLong: {
            type: DataTypes.STRING(360),
            field: 'college_desc_long'
        }
    },{
        tableName: 'college',
        timestamps: false
    });

    College.associate = function(models) {
        models.College.hasMany(models.Department,{
            foreignKey: 'deptCollege',
            sourceKey: 'collegeId'
        });
    };

    College.sync();

    return College;
}