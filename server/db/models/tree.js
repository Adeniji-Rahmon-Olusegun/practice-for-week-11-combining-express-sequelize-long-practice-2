'use strict';
const {
  Model
} = require('sequelize');

//const { InsectTree } = require('../models');

module.exports = (sequelize, DataTypes) => {
  class Tree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tree.belongsToMany(
        models.Insect,
        { 
          through: models.InsectTree,
          foreignKey: 'treeId',
          otherKey: 'insectId'
        }
      );
    }
  };
  Tree.init({
    tree: DataTypes.STRING,
    location: DataTypes.STRING,
    heightFt: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      }
    },
    groundCircumferenceFt: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
      }
    }
  }, {
    sequelize,
    modelName: 'Tree',
    timestamps: true
  });
  return Tree;
};