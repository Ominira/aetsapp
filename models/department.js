(function() {

    'use strict';
    module.exports = (sequelize, DataTypes) => {
        const Department = sequelize.define('Department', {
            deptId: {
                type: DataTypes.CHAR(10),
                primaryKey: true,
                field: 'dept_id'
            },
            deptDescriptionShort: {
                type: DataTypes.STRING(280),
                field: 'dept_desc_short'
            },
            deptDescriptionLong: {
                type: DataTypes.STRING(280),
                field: 'dept_desc_long'
            },
            deptCollege: {
                type: DataTypes.CHAR(10),
                field: 'dept_college',
                references: {
                    model: 'college',
                    key: 'college_id'
                }
            }
        }, {
            tableName: 'department',
            timestamps: false
        });

        Department.associate = function(models) {
            models.Department.belongsTo(models.College, {
                foreignKey: 'deptCollege',
                targetKey: 'collegeId'
            });
            models.Department.hasMany(models.Course, {
                foreignKey: 'courseDeparment',
                sourceKey: 'deptId'
            });
            models.Department.hasMany(models.Lecturer, {
                foreignKey: 'lecturerDepartment',
                sourceKey: 'deptId'
            });
            models.Department.hasMany(models.Degree, {
                foreignKey: 'degreeDepartment',
                sourceKey: 'deptId'
            });
        };

        Department.sync();

        return Department;
    };
})();