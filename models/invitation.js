const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitation.hasOne(models.Project, { foreignKey: 'projectId' });
      Invitation.hasOne(models.OrganizationMembersRole, { foreignKey: 'roleId' });
      Invitation.belongsTo(models.Organization, { foreignKey: 'organizationId' });
    }
  }
  Invitation.init({
    uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4},
    projectId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Project', key: 'id'} },
    organizationId: { type: DataTypes.INTEGER, allowNull: true, foreignKey: true, references: {model: 'Organization'} },
    inviteeEmail: { type: DataTypes.STRING, allowNull: false},
    invitationCode: { type: DataTypes.STRING, allowNull: false},
    roleId: { type: DataTypes.STRING, allowNull: true, foreignKey: true, references: {model: 'OrganizationMembersRole', key: 'id'}},
    invitationStatus: { type: DataTypes.STRING, allowNull: true},
    invitedBy: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true, references: {model: 'User', key: 'id'}}
  }, {
    sequelize,
    modelName: 'Invitation',
    timestamps: true
  });
  return Invitation;
};