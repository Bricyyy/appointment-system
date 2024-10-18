'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      start: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      patientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      appointmentType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Use Sequelize.NOW for default timestamp
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Use Sequelize.NOW for default timestamp
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  },
};
