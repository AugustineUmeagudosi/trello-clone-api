const _ = require('lodash'),
    dbQueries = require('./dbQueries'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    helpers = require('../helpers/utilities'),
    mailService = require('../helpers/mailServices'),
    { v4: uuidv4 } = require('uuid');


module.exports = {
    createOrganization: async (req, res) => {
        const { error } = validate.createOrganization(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const organization = _.pick(req.body, variables.organizationDetails); 
        organization.id = uuidv4();       
        organization.createdBy = req.user._id;
        organization.slug = helpers.generateOrganizationSlug(req.body.name);
        const organizationData = await dbQueries.createOrganization(organization);  

        const data = _.pick(organizationData, variables.organizationDetails);
        return responseMessages.created('Organization created successfully!', data, res);
    },

    inviteMembers: async (req, res) => {
        const { error } = validate.invitations(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const organization = await dbQueries.findOne(req.body.organizationId);
        if(!organization) return responseMessages.badRequest('Invalid organization', res);
        if(organization.createdBy !== req.user._id) return responseMessages.forbidden('Please contact the organization owner', res);

        req.body.invitees.forEach(async(invitee) => {
            const invitation = {}; 
            invitation.id = uuidv4();
            invitation.inviteeEmail = invitee.email;
            invitation.roleId = invitee.roleId;
            invitation.organizationId = req.body.organizationId;
            invitation.invitedBy = req.user._id;
            invitation.invitationCode = helpers.generateinvitationCode();
            await dbQueries.createInvitation(invitation); 
        }); 

        // mailService.sendVerificationEmail(req.body.inviteeEmail);
        return responseMessages.created('invitation(s) sent successfully!', null, res);
    },

    acceptInvitation: async (req, res) => {
        const invitation = await dbQueries.getInvitation(req.params.invitationCode);
        if(!invitation) return responseMessages.badRequest('Invalid invitation code', res);
        
        const organizationExists = await dbQueries.getOrganizationById(invitation.organizationId);
        if(!organizationExists) return responseMessages.badRequest('Invalid organization', res);

        const newOrganizationMember = {};
        newOrganizationMember.id = uuidv4();
        newOrganizationMember.organizationId = invitation.organizationId;
        newOrganizationMember.memberId = req.user._id;
        newOrganizationMember.roleId = invitation.roleId;
        await dbQueries.createOrganizationMember(newOrganizationMember);
        
        invitation.invitationStatus = 'Accepted';
        await dbQueries.updateInvitationStatus(invitation);

        return responseMessages.created('Invitation accepted successfully!',invitation, res);
    },

    getAllOrganizations: async (req, res) => {
        const organization = await dbQueries.getAllOrganizations();
        if(!organization) return responseMessages.badRequest('Invalid organization', res);

        return responseMessages.success('Here you go', organization, res);
    },

    getRoles: async (req, res) => {
        const roles = await dbQueries.getRoles();
        if(!roles) return responseMessages.notFound('No roles found', res);

        return responseMessages.success('Here you go', roles, res);
    }
};