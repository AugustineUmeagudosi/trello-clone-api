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

// fetch all roles
router.get( '/roles', organizationService.getRoles );

// get organization by id
router.get( '/', organizationService.getAllOrganizations );

module.exports = router;