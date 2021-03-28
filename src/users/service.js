const _ = require('lodash'),
    bcrypt = require('bcrypt'),
    dbQueries = require('./dbQueries'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    helpers = require('../helpers/utilities');

module.exports = {
    registration: async (req, res) => {
        const { error } = validate.registration(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const emailExists = await dbQueries.findUser(req.body.email.toLowerCase());      
        if(emailExists) return responseMessages.badRequest( 'This email already exists.', res );

        const user = _.pick(req.body, variables.userDetails);
        user.email = req.body.email.toLowerCase();  
        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(req.body.password, salt);
        const userData = await dbQueries.createUser(user);

        const data = _.pick(userData, variables.userDetails);
        return responseMessages.created('You have been registered!.', data, res);
    },

    login: async (req, res) => {
        const { error } = validate.login(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        let user = await dbQueries.findUser(req.body.email.toLowerCase());
        if (!user) return responseMessages.badRequest( 'Invalid email or password', res );

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return responseMessages.badRequest( 'Invalid email or password', res );

        user = _.pick(user, variables.userDetails);
        const token = helpers.generateAuthToken(user);
        return responseMessages.successfulLogin( token, 'You have logged in successfully!', user, res );
    }
};