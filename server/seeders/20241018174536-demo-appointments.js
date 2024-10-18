'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('appointments', [
      {
        title: 'Initial Consultation',
        start: new Date(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour later
        patientName: 'John Doe',
        appointmentType: 'Consultation',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Follow-up Appointment',
        start: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days later
        end: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000), // 1 hour later
        patientName: 'Jane Smith',
        appointmentType: 'Follow-up',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more appointments as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('appointments', null, {});
  },
};
