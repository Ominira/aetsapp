'use strict';

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student',{
        studentId: {
            type: DataTypes.STRING(15),
            primaryKey: true,
            field: 'stud_id'
        },
        studentName: {
            type: DataTypes.STRING,
            field: 'stud_name'
        },
        studentSex: {
            type: DataTypes.STRING,
            field: 'stud_sex',
            validate: {
                isIn: {
                    args: [['male','female']],
                    msg: "Must be male or female"
                }
            }
        },
        studentActive: {
            type: DataTypes.BOOLEAN,
            field: 'stud_active',
        },
        studentDegree: {
            type: DataTypes.CHAR(20),
            field: 'stud_degree',
            references: {
                model: 'degree',
                key: 'degree_id'
            }
        },
        studentProgram: {
            type: DataTypes.INTEGER,
            field: 'stud_program',
            references: {
                model: 'program',
                key: 'program_id'
            }
        },
        studentEmail: {
            type: DataTypes.STRING,
            field: 'stud_email',
            validate: {
                isEmail: true
            }
        },
        studentHandphone: {
            type: DataTypes.STRING,
            field: 'stud_handphone'
        },
        studentIntake: {
            type: DataTypes.STRING,
            field: 'stud_intake',
            allowNull: true
        }
    },{
        tableName: 'student',
        timestamps: false
    });

    Student.associate = function (models) {
        models.Student.belongsTo(models.Degree,{
            foreignKey: 'studentDegree',
            targetKey: 'degreeId'
        });
        models.Student.belongsTo(models.Program,{
            foreignKey: 'studentProgram',
            targetKey: 'programId'
        });
        models.Student.belongsToMany(models.Course,{
            through: models.CourseRegistration,
            as: 'RegStudentCourse',
            foreignKey: 'registeredStudent',
            otherKey: 'registeredCourse'
        });
        models.Student.belongsToMany(models.Semester,{
            through: models.CourseRegistration,
            as: 'RegStudentSem',
            foreignKey: 'registeredStudent',
            otherKey: 'registeredSemester'
        });
    };

    Student.sync();

    return Student;
}