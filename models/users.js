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
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
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
//     .bulkCreate([{
//         name: 'Philips Shadey', 
//         username: 'admin@bells',
//         password: accounts.hash('admin'),
//         email: 'admin@bellstech.com',
//         isAdmin: true,
//         isSuperAdmin: false,
//         lastLogin: JSON.stringify({
//             location: 'Bells',
//             ipaddress: '192.168.0.2',
//             timestamp: moment().format()
//         })
//     },{
//         name: 'John Taye', 
//         username: 'superadmin@bells',
//         password: accounts.hash('superadmin'),
//         email: 'superadmin@bellstech.com',
//         isAdmin: true,
//         isSuperAdmin: true,
//         lastLogin: JSON.stringify({
//             location: 'Not Bells',
//             ipaddress: '192.168.0.1',
//             timestamp: moment().format()
//         })
//     }]).then(() => {
//         return Users.findAll();
//     }).then(users => {
//         console.log("My Users: ",users.length);
//     });

  Users.sync();

  return Users;
};