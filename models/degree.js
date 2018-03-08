'use strict';

module.exports = (sequelize, DataTypes) => {
    const Degree = sequelize.define('Degree',{
        degreeId: {
            type: DataTypes.CHAR(20),
            primaryKey: true,
            field: 'degree_id'
        },
        degreeDescriptionShort: {
            type: DataTypes.STRING(300),
            field: 'degree_desc_short'
        },
        degreeDescriptionLong: {
            type: DataTypes.STRING(300),
            field: 'degree_desc_long'
        },
        degreeTotalUnit: {
            type: DataTypes.INTEGER,
            field: 'degree_total_unit'
        },
        degreeDuration: {
            type: DataTypes.FLOAT,
            field: 'degree_duration'
        },
        degreeDepartment: {
            type: DataTypes.CHAR(10),
            field: 'degree_department',
            references: {
                model: 'department',
                key: 'dept_id'
            }
        }
    },{
        tableName: 'degree',
        timestamps: false
    });

    Degree.associate = function (models) {
        models.Degree.hasMany(models.Student,{
            foreignKey: 'studentDegree',
            sourceKey: 'degreeId'
        });

        models.Degree.belongsTo(models.Department,{
            foreignKey: 'degreeDepartment',
            targetKey: 'deptId'
        });
    };

    Degree.sync();

    return Degree;
};