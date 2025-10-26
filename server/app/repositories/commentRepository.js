/**
 * @file app/repositories/commentRepository.js
 * @description commentRepository
 * 251019 v1.0 meerkat
 */

import db from '../models/index.js';
const { sequelize, Comment, Post, User } = db;


async function show(t = null, id) {
  return await Comment.findByPk(
    id,
    {
      include: [
        {
          model: Post,
          required: true,
        },
        {
          model: User,
          required: true,
        },
      ],
      transaction: t
    }
  );
}

async function store(t = null, data) {
  return await Comment.create(
    data,
    {
      transaction: t
    }
  );
}

export const commentRepository = {
  store,
  show,
}