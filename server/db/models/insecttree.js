'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InsectTree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InsectTree.belongsTo(
        models.Tree,
        {
          foreignKey: 'treeId',
          onDelete: 'CASCADE'
        }
      );

      InsectTree.belongsTo(
        models.Insect,
        {
          foreignKey: 'insectId',
          onDelete: 'CASCADE'
        }
      )
    }
  }
  InsectTree.init({
    insectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    treeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'InsectTree',
    timestamps: true
  });
  return InsectTree;
};