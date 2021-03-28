//users
const userDetails = [
    'uuid', 'email', 'name'
],

organizationDetails = [
    'uuid', 'name', 'slug', 'createdBy'
];

invitationDetails = [
    'uuid', 'projectId', 'organizationId', 'invitationCode', 'inviteeEmail', 'invitedBy'
];

module.exports = {
    userDetails, organizationDetails, invitationDetails
};