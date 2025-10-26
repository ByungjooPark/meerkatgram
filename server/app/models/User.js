/**
 * @file app/models/User.js
 * @description User 모델
 * 251019 v1.0 meerkat
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'User'; // 모델명 (JS 내부에서 사용)

// 컬럼 정의 (각 속성명은 JS 내부에서 사용할 속성명)
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
    allowNull: true,
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

const options = {
  tableName: 'users', // 실제 DB 테이블명,
  timestamps: true, // createdAt, updatedAt 자동 관리,
  paranoid: true, // deletedAt 자동 관리 (soft delete)
}

const User = {
  init: (sequelize) => {
    const defineUser = sequelize.define(modelName, attributes, options);

    // JSON으로 serialize시, 제외할 컬럼 지정
    defineUser.prototype.toJSON = function() {
      const attributes = this.get();
      delete attributes.password;
      delete attributes.refreshToken;
      delete attributes.provider;
      delete attributes.deletedAt;
      return attributes;
    }

    return defineUser;
  },
  // 모델 관계 정의
  associate: (db) => {
    db.User.hasMany(db.Post, { sourceKey: 'id', foreignKey: 'userId' });
    db.User.hasMany(db.Comment, { sourceKey: 'id', foreignKey: 'userId' });
  }
}

export default User;