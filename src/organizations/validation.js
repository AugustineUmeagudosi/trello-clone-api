const Joi = require('@hapi/joi');

function createOrganization(organization) {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  });

  return schema.validate(organization);
}

function invitations(organization) {
  const schema = Joi.object().keys({
    organizationId: Joi.string().required(),
    invitees: Joi.array().required()
  });

  return schema.validate(organization);
}

module.exports = {
  createOrganization, invitations
};