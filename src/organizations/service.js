const _ = require('lodash'),
    dbQueries = require('./dbQueries'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    helpers = require('../helpers/utilities'),
    mailService = require('../helpers/mailServices');

module.exports = {
    createOrganization: async (req, res) => {
        const { error } = validate.createOrganization(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const organization = _.pick(req.body, variables.organizationDetails);        
        organization.createdBy = req.user._id;
        organization.slug = helpers.generateOrganizationSlug(req.body.name);
        await dbQueries.createOrganization(organization);  

        const data = _.pick(organization, variables.organizationDetails);
        return responseMessages.created('Organization created successfully!', data, res);
    },

    inviteMembers: async (req, res) => {
        const { error } = validate.invitations(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const organization = await dbQueries.findOrganizationById(req.body.organizationId);
        if(!organization) return responseMessages.badRequest('Invalid organization', res);
        if(organization.createdBy !== req.user._id) return responseMessages.forbidden('Please contact the organization owner', res);

        req.body.inviteeEmail.forEach(async(inviteeEmail) => {
            const invitation = _.pick(req.body, variables.invitationDetails);        
            invitation.invitedBy = req.user._id;
            invitation.invitationCode = helpers.generateinvitationCode();
            invitation.inviteeEmail = inviteeEmail;
            await dbQueries.createInvitation(invitation); 
        }); 

        mailService.sendVerificationEmail(req.body.inviteeEmail);
        return responseMessages.created('invitation(s) sent successfully!', null, res);
    },

    acceptInvitation: async (req, res) => {
        const invitation = await dbQueries.getInvitation(req.params.invitationCode);
        if(!invitation) return responseMessages.badRequest('Invalid invitation code', res);

        const organizationExists = await dbQueries.getOrganizationById(invitation.organizationId);
        if(!organizationExists) return responseMessages.badRequest('Invalid organization', res);

        const newOrganizationMember = {};
        newOrganizationMember.organizationId = invitation.organizationId;
        newOrganizationMember.memberId = req.user._id;
        newOrganizationMember.roleId = invitation.roleId;
        await dbQueries.createOrganizationMember(newOrganizationMember);

        invitation.status = 'Accepted';
        // update invitation

        return responseMessages.created('Invitation accepted successfully!', res);
    },

    getOrganization: async (req, res) => {
        const organization = await dbQueries.findOne(req.params.id);
        if(!organization) return responseMessages.badRequest('Invalid organization', res);

        return responseMessages.success('Here you go', organization, res);
    }
};