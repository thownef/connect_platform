'use strict';

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
    return queryInterface.bulkInsert('user_register', [
      {id: 1, email: 'company1@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty ABC', user_name: 'Người dùng 1', phone: '123456789', booking_count: 4, company_name_en: 'ABC Company', company_name_jp: '株式会社ABC', allow :0, operator: "NEW", highlight: 0},
      {id: 2, email: 'company2@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty XYZ', user_name: 'Người dùng 2', phone: '987654321', booking_count: 4, company_name_en: 'XYZ Company', company_name_jp: '株式会社XYZ', allow :0, operator: "NEW", highlight: 0},
      {id: 3, email: 'company3@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty DEF', user_name: 'Người dùng 3', phone: '111222333', booking_count: 4, company_name_en: 'DEF Company', company_name_jp: '株式会社DEF', allow :0, operator: "NEW", highlight: 0},
      {id: 4, email: 'company4@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty GHI', user_name: 'Người dùng 4', phone: '444555666', booking_count: 4, company_name_en: 'GHI Company', company_name_jp: '株式会社GHI', allow :0, operator: "NEW", highlight: 0},
      {id: 5, email: 'company5@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty JKL', user_name: 'Người dùng 5', phone: '777888999', booking_count: 4, company_name_en: 'JKL Company', company_name_jp: '株式会社JKL', allow :0, operator: "NEW", highlight: 0},
      {id: 6, email: 'company6@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty MNO', user_name: 'Người dùng 6', phone: '000111222', booking_count: 4, company_name_en: 'MNO Company', company_name_jp: '株式会社MNO', allow :0, operator: "NEW", highlight: 0},
      {id: 7, email: 'company7@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty PQR', user_name: 'Người dùng 7', phone: '333444555', booking_count: 4, company_name_en: 'PQR Company', company_name_jp: '株式会社PQR', allow :0, operator: "NEW", highlight: 0},
      {id: 8, email: 'company8@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty STU', user_name: 'Người dùng 8', phone: '666777888', booking_count: 4, company_name_en: 'STU Company', company_name_jp: '株式会社STU', allow :0, operator: "NEW", highlight: 0},
      {id: 9, email: 'company9@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty VWX', user_name: 'Người dùng 9', phone: '999000111', booking_count: 4, company_name_en: 'VWX Company', company_name_jp: '株式会社VWX', allow :0, operator: "NEW", highlight: 0},
      {id: 10, email: 'company10@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty YZ', user_name: 'Người dùng 10', phone: '222333444', booking_count: 4, company_name_en: 'YZ Company', company_name_jp: '株式会社YZ', allow :0, operator: "NEW", highlight: 0},
      {id: 11, email: 'company11@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty LMN', user_name: 'Người dùng 11', phone: '555666777', booking_count: 4, company_name_en: 'LMN Company', company_name_jp: '株式会社LMN', allow :0, operator: "NEW", highlight: 0},
      {id: 12, email: 'company12@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty OPQ', user_name: 'Người dùng 12', phone: '888999000', booking_count: 4, company_name_en: 'OPQ Company', company_name_jp: '株式会社OPQ', allow :0, operator: "NEW", highlight: 0},
      {id: 13, email: 'company13@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty RST', user_name: 'Người dùng 13', phone: '123123123', booking_count: 4, company_name_en: 'RST Company', company_name_jp: '株式会社RST', allow :0, operator: "NEW", highlight: 0},
      {id: 14, email: 'company14@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty UVW', user_name: 'Người dùng 14', phone: '456456456', booking_count: 4, company_name_en: 'UVW Company', company_name_jp: '株式会社UVW', allow :0, operator: "NEW", highlight: 0},
      {id: 15, email: 'company15@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty XYZ', user_name: 'Người dùng 15', phone: '789789789', booking_count: 4, company_name_en: 'XYZ Company', company_name_jp: '株式会社XYZ', allow :0, operator: "NEW", highlight: 0},
      {id: 16, email: 'company16@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty DEF', user_name: 'Người dùng 16', phone: '159357852', booking_count: 4, company_name_en: 'DEF Company', company_name_jp: '株式会社DEF', allow :0, operator: "NEW", highlight: 0},
      {id: 17, email: 'company17@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty ABE', user_name: 'Người dùng 17', phone: '753951852', booking_count: 4, company_name_en: 'ABE Company', company_name_jp: '株式会社ABE', allow :0, operator: "NEW", highlight: 0},
      {id: 18, email: 'company18@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty GHI', user_name: 'Người dùng 18', phone: '147258369', booking_count: 4, company_name_en: 'GHI Company', company_name_jp: '株式会社GHI', allow :0, operator: "NEW", highlight: 0},
      {id: 19, email: 'company19@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty OBC', user_name: 'Người dùng 19', phone: '547258369', booking_count: 4, company_name_en: 'OBC Company', company_name_jp: '株式会社OBC', allow :0, operator: "NEW", highlight: 0},
      {id: 20, email: 'company20@example.com', password: '$2y$10$rKUtueFxqAZYxmt0kBvdD.dsAGZoINu2sPoWEkO7T4H0xDFjVTvqS', country: 'Japan', company_name: 'Công ty EAI', user_name: 'Người dùng 20', phone: '347258369', booking_count: 4, company_name_en: 'EAI Company', company_name_jp: '株式会社EAI', allow :0, operator: "NEW", highlight: 0}
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', "NEW", {});
     */
  }
};

