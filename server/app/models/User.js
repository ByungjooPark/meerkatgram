/**
 * @file app/models/User.js
 * @description User 모델
 * 251019 v1.0 meerkat
 */

import { DataTypes } from "sequelize";

const modelName = 'User'; // 모델명 (JS 내부에서 사용)

// 컬럼 정의 (각 속성명은 JS 내부에서 사용할 속성명)
const attributes = {
  id: {
      field: 'user_id' // 실제 DB 컬럼명,
      // type: DataTypes.BIGINT.UNSIGNED  // 데이터타입 설정,
      // primaryKey: true // 기본 키 설정,
      // allowNull: false // NOT NULL 제약조건,
      // autoIncrement: true // AUTO_INCREMENT 설정
  },
  email:{
      field: 'email',
      type: DataTypes.STRING(100),
      allowNull: false
  },
  password: {
      field: 'password',
      type: DataTypes.STRING(255),
      allowNull: false
  },
  nick: {
      field: 'nick',
      type: DataTypes.STRING(20),
      allowNull: false
  },
  provider: {
      field: 'provider',
      type: DataTypes.STRING(10),
      allowNull: false
  },
  role: {
      field: 'role',
      type: DataTypes.STRING(10),
      allowNull: false
  },
  refreshToken: {
      field: 'refresh_token',
      type: DataTypes.STRING(255),
      allowNull: true
  },
  createdAt: {
      field: 'created_at',
      type: DataTypes.DATE
  },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
  },
  deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE
  }
}

const options = {
  tableName: 'users' // 실제 DB 테이블명,
  // timestamps: true // createdAt, updatedAt 자동 관리,
  // paranoid: true // deletedAt 자동 관리 (soft delete)
}

const User = {
  init: (sequelize) => {
    const defineUser = sequelize.defin(modelName, attributes, options);

    // JSON으로 serialize시, 제외할 컬럼 지정
    defineUser.prototype.toJSON = function() {
        const attributes = this.get();
        delete attributes.password;
        delete attributes.refreshToken;
        return attributes;
    }

    return defineUser;
  },
  // 모델 관계 정의
  // associate: (db) => {

  // }
}

export default User;