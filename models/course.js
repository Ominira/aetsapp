'use strict';

module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course',{
        courseId: {
            type: DataTypes.CHAR(6),
            primaryKey: true,
            field: 'course_id'
        },
        courseDescriptionShort: {
            type: DataTypes.STRING,
            field: 'course_desc_short'
        },
        courseDescriptionLong: {
            type: DataTypes.STRING,
            field: 'course_desc_long'
        },
        courseActive: {
            type: DataTypes.BOOLEAN,
            field: 'course_active',
            defaultValue: true
        },
        courseUnits: {
            type: DataTypes.INTEGER,
            field: 'course_units'
        },
        courseDepartment: {
            type: DataTypes.CHAR(10),
            field: 'course_dept',
            references: {
                model: 'department',
                key: 'dept_id'
            }
        }
    },{
        tableName: 'course',
        timestamps: false
    });

    Course.associate = function (models) {
        models.Course.belongsTo(models.Department,{
            foreignKey: 'courseDepartment',
            targetKey: 'deptId'
        });
        models.Course.belongsToMany(models.Student,{
            through: models.CourseRegistration,
            as:'RegCourseStudent',
            foreignKey: 'registeredCourse',
            otherKey: 'registeredStudent'
        });
        models.Course.belongsToMany(models.Semester,{
            through: models.CourseRegistration,
            as: 'RegCourseSem',
            foreignKey: 'registeredCourse',
            otherKey: 'registeredSemester'
        });
        models.Course.hasMany(models.CourseRegistrationStrength,{
            foreignKey: 'course',
            sourceKey: 'courseId'
        })
    };

    Course.sync();

    return Course;
}