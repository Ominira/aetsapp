'use strict';

module.exports = (sequelize, DataTypes) => {
    const Lecturer = sequelize.define('Lecturer',{
        lecturerId: {
            type: DataTypes.CHAR(15),
            primaryKey: true,
            field: 'lect_id'
        },
        lecturerName: {
            type: DataTypes.STRING,
            field: 'lect_name'
        },
        lecturerSex: {
            type: DataTypes.STRING,
            field: 'lect_sex',
            validate: {
                isIn: {
                    args: [['male','female']],
                    msg: "Must be male or female"
                }
            }
        },
        lecturerActive: {
            type: DataTypes.BOOLEAN,
            field: 'lect_active',
        },
        lecturerDepartment: {
            type: DataTypes.CHAR(10),
            field: 'lect_dept',
            references: {
                model: 'department',
                key: 'dept_id'
            }
        },
        lecturerEmail: {
            type: DataTypes.STRING,
            field: 'lect_email',
            validate: {
                isEmail: true
            }
        },
        lecturerHandphone: {
            type: DataTypes.STRING,
            field: 'lect_handphone'
        }
    },{
        tableName: 'lecturer',
        timestamps: false
    });

    Lecturer.associate = function (models) {
        models.Lecturer.belongsTo(models.Department,{
            foreignKey: 'lecturerDepartment',
            targetKey: 'deptId'
        });
    };

    Lecturer.sync();

    return Lecturer;
}