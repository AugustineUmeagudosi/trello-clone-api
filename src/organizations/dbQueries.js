const { Sequelize, User, Organization, Invitation, OrganizationMembersRole, OrganizationMember } = require("../../models");
const Op = Sequelize.Op;
const variables = require('../helpers/parameters');

module.exports = {
    createOrganization: (user) => {
        return Organization.create(user).catch(error => console.log(error.message));
    },
    
    findOrganizationById: (id) => {
        return Organization.findOne({where: {uuid: id}}).catch(error => console.log(error.message));
    },
    
    createInvitation: (invitation) => {
        return Invitation.create(invitation).catch(error => console.log(error.message));
    },
    
    getInvitation: (code) => {
        return Invitation.findOne({ where: {invitationCode: code }}).catch(error => console.log(error.message));
    },
    
    createOrganizationMember: (member) => {
        return OrganizationMember.create(member).catch(error => console.log(error.message));
    },
    
    getOrganizationById: (id) => {
        return Organization.findOne({
            where: {id},
            attributes: variables.organizationDetails, 
            include:[
                { model: User, as: 'Owner', attributes: ['name'] },
            ] 
        }).catch(error => console.log(error));
    },

    getAllOrganizations: () => {
        return Organization.findAll({
            attributes: variables.organizationDetails, 
            include:[
                { model: User, as: 'Owner', attributes: ['name'] },
            ]
        }).catch(error => console.log(error.message));
    },

    getRoles: () => {
        return OrganizationMembersRole.findAll().catch(error => console.log(error.message));
    },

    updateInvitationStatus: (invitation) => {
        return Invitation.update(
            { invitationStatus: invitation.invitationStatus},
            { where : { id: invitation.id } }
        ).catch(error => console.log(error.message));
    }
};