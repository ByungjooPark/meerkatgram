/**
 * @file app/repositories/userRepositories.js
 * @description user 레파지토리
 * 251019 v1.0 meerkat
 */

import db from '../models/index.js';
const { sequelize, User } = db;

async function store(t = null, data) {
  return await User.create(
    data,
    {
      transaction: t
    }
  );
}

async function findWithEmail(t = null, email) {
  return await User.findOne(
    { 
      where: { email: email }
    },
    {
      transaction: t
    });
}

async function update(t = null, user) {
  return await user.save({transaction: t});
}

export const userRepository = {
  store,
  findWithEmail,
  update,
}