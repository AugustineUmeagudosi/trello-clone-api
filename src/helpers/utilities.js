const jwt = require('jsonwebtoken');
const Chance = require('chance');
const chance = new Chance();

require('dotenv').config();


module.exports = {
    generateAuthToken: (user) => {
        const token = jwt.sign({_id: user.id, role: user.role}, process.env.JWT_SECRET);
        return token;
    },
    
    generateToken: (user) => {
        const token = jwt.sign({email: user.email}, process.env.JWT_SECRET);
        return token;
    },
    
    generateOrganizationSlug: (organizationName) => {
        const randomString = chance.string({ length: 5, casing: 'upper', alpha: true, numeric: true }),
            slug = `${organizationName.replace(/\W+/g, '-').toLowerCase()}-${randomString}`;
        return slug;
    },
    
    generateinvitationCode: () => {
        return chance.string({ length: 10, casing: 'mixed', alpha: true, numeric: true });
    }
};