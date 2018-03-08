'use strict';

module.exports = (sequelize, DataTypes) => {
    const CourseRegistration = sequelize.define('CourseRegistration',{
        courseRegistrationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'courseregis_id'
        },
        registeredSemester: {
            type: DataTypes.CHAR(11),
            field: 'courseregis_semester',
            references: {
                model: 'semester',
                key: 'semester_id'
            }
        },
        registeredCourse: {
            type: DataTypes.CHAR(6),
            field: 'courseregis_course',
            references: {
                model: 'course',
                key: 'course_id'
            }
        },
        registeredStudent: {
            type: DataTypes.STRING(15),
            field: 'courseregis_student',
            references: {
                model: 'student',
                key: 'stud_id'
            }
        }
    },{
        tableName: 'course_registration',
        timestamps: false
    });

    CourseRegistration.associate = function(models){
        models.CourseRegistration.belongsTo(models.Student,{
            foreignKey: 'registeredStudent',
            targetKey: 'studentId'
        });
        models.CourseRegistration.belongsTo(models.Semester,{
            foreignKey: 'registeredSemester',
            targetKey: 'semesterId'
        });
        models.CourseRegistration.belongsTo(models.Course,{
            foreignKey: 'registeredCourse',
            targetKey: 'courseId'
        });
    };

    CourseRegistration.sync();

    return CourseRegistration;
}