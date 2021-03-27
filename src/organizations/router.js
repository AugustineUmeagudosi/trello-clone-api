const express = require('express');
const router = express.Router();
const organizationService = require('./service');
const auth = require('../helpers/middlewares/auth');
const accessControl = require('../helpers/middlewares/accessControl');

// create organization
router.post( '/', auth,  organizationService.createOrganization );

// invite members to an organization
router.post( '/invitation', auth,  organizationService.inviteMembers );

// accept invitation to an organization
router.post( '/invitation/:invitationCode', auth, organizationService.acceptInvitation );

// accept invitation
router.get( '/:id', organizationService.getOrganization );

module.exports = router;