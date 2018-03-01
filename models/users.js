'use strict';
var accounts = require('../controllers/accounts');
var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Users = sequelize.define('Users', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name:{
        type: DataTypes.STRING(1234),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(625),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    lastLogin: {
        type: DataTypes.TEXT,
        defaultValue: {
            location: '',
            ipaddress: '',
            timestamp: Date.now()
        }
    }
  },{
    tableName: 'users',
    timestamps: true,
    paranoid: true
  });

//   Users
//     .create({
//         name: 'Philips Shadey', 
//         username: 'admin@bells',
//         password: accounts.hash('admin'),
//         isAdmin: true,
//         isSuperAdmin: false,
//         lastLogin: JSON.stringify({
//             location: 'Bells',
//             ipaddress: '192.168.0.2',
//             timestamp: moment().format()
//         })
//     }).then(user => {
//         console.log("User is %s and is Super Admin %s",user.get('name'),user.get('isSuperAdmin'));
//     });
  Users.sync();

  return Users;
};