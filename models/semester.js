'use strict';

module.exports = (sequelize, DataTypes) => {
    var Semester = sequelize.define('Semester',{
        semesterId: {
            type: DataTypes.CHAR(11),
            primaryKey: true,
            field: 'semester_id'
        },
        semesterDescription: {
            type: DataTypes.STRING(300),
            field: 'semester_desc',
        },
        semesterCurrent: {
            type: DataTypes.BOOLEAN,
            field: 'semester_current',
            defaultValue: false
        },
        semesterSession: {
            type: DataTypes.STRING,
            field: 'semester_session'
        }
    },{
        tableName: 'semester',
        timestamp: false
    });

    Semester.associate = function (models) {
        models.Semester.belongsToMany(models.Student,{
            through: models.CourseRegistration,
            as: 'RegSemStudent',
            foreignKey: 'registeredSemester',
            otherKey: 'registeredStudent'
        });
        models.Semester.belongsToMany(models.Course,{
            through: models.CourseRegistration,
            as: 'RegSemCourse',
            foreignKey: 'registeredSemester',
            otherKey: 'registeredCourse'
        });
        models.Semester.hasMany(models.CourseRegistrationStrength,{
            foreignKey: 'semester',
            sourceKey: 'semesterId'
        });
    };

    Semester.sync();

    return Semester;
};