import mongoose from 'mongoose';
import { User, Account } from '../src/server/def/userService';

// connect to mongo

mongoose.connect('mongodb://localhost/graphqltest');

// seed account
let accounts = [
    {
        _id: '789645ad1c15462d14479455',
        name: 'Han Solo',
        balance: 1000,
        lastupdated: new Date()
    },
    {
        _id: '559645cd1a38532d14349246',
        name: 'Luke Skywalker',
        balance: 20000,
        lastupdated: new Date()
    }
];

// drop accounts collection

mongoose.connection.collections['accounts'].drop( function(err) {

  Account.create(accounts, function(err, res){

    if (err) {
      console.log(err);
    }
    else {
      console.log('Seed account data created.');
    }

    //process.exit();

  });

});



// seed users

let users = [
    {
        _id: '559645cd1a38532d14349240',
        fullname: 'Han Solo',
        username: 'hansolo',
        password: 'hansolo123',
        account: '789645ad1c15462d14479455',
        email: 'hansolo@gmail.com',
        status: 'active'
    },
    {
        _id: '559645cd1a38532d14349241',
        fullname: 'Luke Skywalker',
        username: 'lukeskywalker',
        password: 'lukeskywalker123',
        account: '559645cd1a38532d14349246',
        email: 'lukeskywalker@gmail.com',
        status: 'active'
    }
];

// drop users collection

mongoose.connection.collections['users'].drop( function(err) {

  User.create(users, function(err, res){

    if (err) {
      console.log(err);
    }
    else {
      console.log('Seed user data created.');
    }

    process.exit();

  });

});
