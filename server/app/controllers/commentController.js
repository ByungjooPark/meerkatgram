/**
 * @file app/controllers/commentController.js
 * @description commentController
 * 251019 v1.0 meerkat
 */

import { SUCCESS } from "../../configs/responseCodeConfig.js";
import { commentService } from "../services/commentService.js";
import { createBaseResponse } from "../utils/createBaseResponse.js";

export const commentController = {
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
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, 'post.index'));
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
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, 'delete.show'));
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
      postId: request.body.postId,
      content: request.body.content.trim(),
      commentId: request.body.commentId ? parseInt(request.body.commentId.trim()) : 0,
    }

    const result = await commentService.store(data);
    
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
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, 'delete.destroy'));
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
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, 'post.update'));
  } catch(e) {
    next(e);
  }
}