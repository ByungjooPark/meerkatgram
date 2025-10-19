/**
 * @file database/migrations/251019001_create_likes.js
 * @description likes migration
 * 251019 v1.0 meerkat
 */

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출됨 (테이블 생성)
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'likes'
      ,{
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          comment: '좋아요 ID',
        },
        user_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          comment: '유저 ID',
        },
        post_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          comment: '게시글 ID',
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
      },
      {
        charset: 'utf8mb4',             // 테이블 문자셋 설정 (이모지 포함 지원)
        collate: 'utf8mb4_bin',         // 정렬 방식
        engine: 'InnoDB',               // 사용 엔진 지정
      }
    );
  },

  // 마이그레이션 롤백 시 호출됨 (테이블 제거)
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};