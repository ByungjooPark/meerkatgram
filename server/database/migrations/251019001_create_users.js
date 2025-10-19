/**
 * @file database/migrations/251019001_create_users.js
 * @description users migration
 * 251019 v1.0 meerkat
 */

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  // 마이그레이션 실행 시 호출됨 (테이블 생성)
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users'
      ,{
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          comment: '유저 ID',
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          comment: '이메일(로그인용)',
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: '비밀번호',
        },
        nick: {
          type: DataTypes.STRING(20),
          allowNull: false,
          comment: '닉네임',
        },
        provider: {
          type: DataTypes.STRING(10),
          allowNull: false,
          comment: '로그인 제공자(local, google, kakao 등)',
        },
        role: {
          type: DataTypes.STRING(10),
          comment: '권한(user, admin 등)',
        },
        profile: {
          type: DataTypes.STRING(100),
          comment: '프로필 이미지 경로',
        },
        refresh_token: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: '리프래시 토큰',
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
      },
      {
        charset: 'utf8mb4',             // 테이블 문자셋 설정 (이모지 포함 지원)
        collate: 'utf8mb4_bin',         // 정렬 방식
        engine: 'InnoDB',               // 사용 엔진 지정
        uniqueKeys: { // 유니크키 설정
          uk_users_email: { // 유니크키명
            fields: ['email'] // 유니크 설정 컬럼
          },
          uk_users_nick: {
            fields: ['nick']
          },
        },
      }
    );
  },

  // 마이그레이션 롤백 시 호출됨 (테이블 제거)
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};