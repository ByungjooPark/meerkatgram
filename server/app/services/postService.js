/**
 * @file app/services/postService.js
 * @description user 서비스
 * 251019 v1.0 meerkat
 */

import { UNMATCHING_USER_ERROR } from '../../configs/responseCodeConfig.js';
import { myError } from '../errors/custom/myError.js';
import db from '../models/index.js';
import { postRepository } from "../repositories/postRepository.js";

async function createPost(data) {
  return await postRepository.store(null, data);
}

async function show(id) {
  return await postRepository.show(null, id);
}

async function update(data) {
  return await db.sequelize.transaction(async t => {
    const post = await postRepository.show(t, data.id);

    if(post.userId !== data.userId) {
      throw myError('작성자 아님', UNMATCHING_USER_ERROR);
    }

    post.title = data.title;
    post.content = data.content;
    post.image = data.image;

    const result = await postRepository.update(t, post);
    return result;
  });
}

export const postService = {
  createPost,
  show,
  update,
}