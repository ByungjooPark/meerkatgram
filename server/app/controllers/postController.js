/**
 * @file app/controllers/userController.js
 * @description user 컨트롤러
 * 251019 v1.0 meerkat
 */

import { SUCCESS } from "../../configs/responseCodeConfig.js";
import { postService } from "../services/postService.js";
import { createBaseResponse } from "../utils/createBaseResponse.js";

export const postController = {
  index,
  show,
  store,
  destroy,
  update,
}

/**
 * 게시글 리스트 조회
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function index(request, response, next) {
  try {
    const result = await postService.getPostsPagination({limit: 10, offset: 0});
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(e) {
    next(e);
  }
}

/**
 * 게시글 상세 조회
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function show(request, response, next) {
  try {
    const result = await postService.show(request.params.id);
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(e) {
    next(e);
  }
}

/**
 * 게시글 작성
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function store(request, response, next) {
  try {
    const data = {
      userId: request.user.userId,
      title: request.body.title.trim(),
      content: request.body.content.trim(),
      image: request.body.image.trim(),
    }

    const result = await postService.createPost(data);
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(e) {
    next(e);
  }
}

/**
 * 게시글 삭제
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function destroy(request, response, next) {
  try {
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, 'post.destroy'));
  } catch(e) {
    next(e);
  }
}

/**
 * 게시글 수정
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function update(request, response, next) {
  try {
    const data = {
      userId: request.user.userId,
      id: parseInt(request.params.id.trim()),
      title: request.body.title.trim(),
      content: request.body.content.trim(),
      image: request.body.image.trim(),
    }

    const result = await postService.update(data);
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(e) {
    next(e);
  }
}