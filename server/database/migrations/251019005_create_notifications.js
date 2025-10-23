/**
 * @file database/migrations/251019001_create_notifications.js
 * @description notifications migration
 * 251019 v1.0 meerkat
 */

import { DataTypes } from 'sequelize';

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '알림 ID',
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 ID',
  },
  title: {
      field: 'title',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '제목',
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(1000),
    allowNull: false,
    comment: '본문',
  },
  isRead: {
    field: 'is_read',
    type: DataTypes.TINYINT(1),
    defaultValue: 0,
    allowNull: false,
    comment: '읽음 여부',
  },
  createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: true
  },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: true
  },
  deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
      allowNull: true
  }
};

const options = {
  charset: 'utf8mb4',             // 테이블 문자셋 설정 (이모지 포함 지원)
  collate: 'utf8mb4_bin',         // 정렬 방식
  engine: 'InnoDB',               // 사용 엔진 지정
}

/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출됨 (테이블 생성)
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', attributes, options);
  },

  // 마이그레이션 롤백 시 호출됨 (테이블 제거)
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications');
  }
};