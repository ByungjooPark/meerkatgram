/**
 * @file app/models/Post.js
 * @description Post 모델
 * 251019 v1.0 meerkat
 */

import dayjs from "dayjs";
import { DataTypes } from "sequelize";

const modelName = 'Post'; // 모델명 (JS 내부에서 사용)

// 컬럼 정의 (각 속성명은 JS 내부에서 사용할 속성명)
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '게시글 ID',
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
    type: DataTypes.STRING(2000),
    allowNull: false,
    comment: '본문',
  },
  image: {
    field: 'image',
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '업로드 이미지 경로',
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
  tableName: 'posts', // 실제 DB 테이블명,
  timestamps: true, // createdAt, updatedAt 자동 관리,
  paranoid: true, // deletedAt 자동 관리 (soft delete)
}

const Post = {
  init: (sequelize) => {
    const definePost = sequelize.define(modelName, attributes, options);

    // JSON으로 serialize시, 제외할 컬럼 지정
    definePost.prototype.toJSON = function() {
      const attributes = this.get();
      return attributes;
    }

    return definePost;
  },
  // 모델 관계 정의
  associate: (db) => {
    db.Post.belongsTo(db.User, { sourceKey: 'id', foreignKey: 'userId' });
    db.Post.hasMany(db.Comment, { sourceKey: 'id', foreignKey: 'postId' });
  }
}

export default Post;