'use strict';

module.exports = (sequelize, DataTypes) => {
    const CourseRegistrationStrength = sequelize.define('CourseRegistrationStrength',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        course: {
            type: DataTypes.CHAR(6),
            references: {
                model: 'course',
                key: 'course_id'
            }
        },
        strength: DataTypes.INTEGER,
        semester: {
            type: DataTypes.CHAR(11),
            references: {
                model: 'semester',
                key: 'semester_id'
            }
        }
    },{
        tableName: 'course_registration_strength',
        timestamps: false
    });

    CourseRegistrationStrength.associate = function(models) {
        models.CourseRegistrationStrength.belongsTo(models.Course,{
            foreignKey: 'course',
            targetKey: 'courseId'
        });
        models.CourseRegistrationStrength.belongsTo(models.Semester,{
            foreignKey: 'semester',
            targetKey: 'semesterId'
        });
    };

    CourseRegistrationStrength.sync();

    return CourseRegistrationStrength;
}