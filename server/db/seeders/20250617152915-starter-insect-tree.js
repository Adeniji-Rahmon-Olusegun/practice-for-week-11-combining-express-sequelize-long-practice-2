'use strict';

const { Tree, Insect, InsectTree } = require('../models');

const insectTree = [

  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    for (let insectIdx = 0; insectIdx < insectTree.length; insectIdx++) {
      const { insect, trees } = insectTree[insectIdx];
      const insectName = insect.name;
      const insecT = await Insect.findOne({ where: { name: insectName }});

      for (let treeIdx = 0; treeIdx < trees.length; treeIdx++) {
        const treeObj = trees[treeIdx];
        const treeName = treeObj.tree;
        const treey = await Tree.findOne({ where: { tree: treeName }});

        await insecT.addTree(treey);
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     for (let insectIdx = 0; insectIdx < insectTree.length; insectIdx++) {
      const { insect, trees } = insectTree[insectIdx];
      const insectName = insect.name;
      const insecT = await Insect.findOne({ where: { name: insectName }});

      for (let treeIdx = 0; treeIdx < trees.length; treeIdx++) {
        const treeObj = trees[treeIdx];
        const treeName = treeObj.tree;
        const treey = await Tree.findOne({ where: { tree: treeName }});


        await InsectTree.delete({
          where:{
            insectId: insecT.id,
            treeId: treey.Id
          }
        });
      }
    }
  }
};
