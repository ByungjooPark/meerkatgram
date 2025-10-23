/**
 * @file app/controllers/userController.js
 * @description user 컨트롤러
 * 251019 v1.0 meerkat
 */

import { SUCCESS } from "../../configs/responseCodeConfig.js";
import { createBaseResponse } from "../utils/createBaseResponse.js";

export const postController = {
  index,
}

/**
 * 게시글 조회
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