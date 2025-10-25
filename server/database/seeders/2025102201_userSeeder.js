import bcrypt from 'bcrypt';
import Role from '../../app/middlewares/auth/configs/roleEnum.js';
import Provider from '../../app/middlewares/auth/configs/providerEnum.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users'
      ,[
        {
          email: 'free@free.com',
          password: await bcrypt.hash('admin', 10),
          nick: '프리',
          provider: Provider.NONE,
          role: Role.FREE,
          profile: '/base.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          email: 'pro@pro.com',
          password: await bcrypt.hash('admin2', 10),
          nick: '프로',
          provider: Provider.NONE,
          role: Role.PRO,
          profile: '/base.png',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          email: 'admin@admin.com',
          password: await bcrypt.hash('admin', 10),
          nick: '관리자',
          provider: Provider.NONE,
          role: Role.ADMIN,
          profile: '/base.png',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
