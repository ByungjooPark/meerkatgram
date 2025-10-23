/**
 * @file database/migrations/251019001_create_users.js
 * @description users migration
 * 251019 v1.0 meerkat
 */

import { DataTypes } from 'sequelize';

const attributes = {
  id: {
    field: 'id', // 실제 DB 컬럼명,
    type: DataTypes.BIGINT.UNSIGNED,  // 데이터타입 설정,
    primaryKey: true, // 기본 키 설정,
    allowNull: false, // NOT NULL 제약조건,
    autoIncrement: true, // AUTO_INCREMENT 설정
    comment: '유저 ID',
  },
  email:{
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '이메일(로그인용)',
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '비밀번호',
  },
  nick: {
    field: 'nick',
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '닉네임',
  },
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자',
  },
  role: {
    field: 'role',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '권한',
  },
  profile: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '프로필 이미지 경로',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프래시 토큰',
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
    await queryInterface.createTable('users', attributes, options);
  },

  // 마이그레이션 롤백 시 호출됨 (테이블 제거)
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};