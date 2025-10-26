/**
 * @file app/services/commentService.js
 * @description commentService
 * 251019 v1.0 meerkat
 */

import db from '../models/index.js';
import { commentRepository } from '../repositories/commentRepository.js';

async function store(data) {
  return await db.sequelize.transaction(async t => {
    const newComment = await commentRepository.store(t, data);

    return await commentRepository.show(t, newComment.id);
    
  });
}

export const commentService = {
  store,
}