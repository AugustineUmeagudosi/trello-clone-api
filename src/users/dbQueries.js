const { Sequelize, User } = require("../../models");
const variables = require('../helpers/parameters');

module.exports = {
   //get user with the specified email
    findUser: (email) => {
        return  User.findOne({ 
        where : { email: email, deleted_at: null } 
        }).catch(error => console.log(error.message));
    },

    //create new user
    createUser: (user) => {
        return User.create(user).catch(error => console.log(error.message));
    },

    //find user by id provided
    findUserById: (id) => {
        return User.findOne({
            where: { id: id, deleted_at: null },
            attributes: variables.userDetails,
            // include: { model: Role, attributes: ['name'] }
        }).catch(error => console.log(error.message));
    }
};