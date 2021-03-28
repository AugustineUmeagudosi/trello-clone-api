//users
const userDetails = [
    'id', 'email', 'name'
],

organizationDetails = [
    'id', 'name', 'slug', 'createdBy'
];

invitationDetails = [
    'id', 'projectId', 'organizationId', 'invitationCode', 'inviteeEmail', 'invitedBy'
];

module.exports = {
    userDetails, organizationDetails, invitationDetails
};