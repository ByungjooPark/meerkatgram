/**
 * @file app/repositories/postRepository.js
 * @description postRepository
 * 251019 v1.0 meerkat
 */

import db from '../models/index.js';
const { sequelize, Post, User } = db;

async function show(t = null, id) {
  return await Post.findByPk(
    id,
    {
      include: [{
        model: User,
        required: true,
      }],
      transaction: t
    }
  );
}

async function store(t = null, data) {
  return await Post.create(
    data,
    {
      transaction: t
    }
  );
}

async function update(t = null, post) {
  return await post.save();
}

export const postRepository = {
  store,
  show,
  update,
}