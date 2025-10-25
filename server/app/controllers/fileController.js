/**
 * @file app/controllers/fileController.js
 * @description user 컨트롤러
 * 251019 v1.0 meerkat
 */

import { BAD_FILE_ERROR, SUCCESS } from "../../configs/responseCodeConfig.js";
import { myError } from "../errors/custom/myError.js";
import { createBaseResponse } from "../utils/createBaseResponse.js";

export const fileController = {
  storeProfile,
  storePosts,
}

/**
 * 프로필 이미지 저장
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function storeProfile(request, response, next) {
  try {
    if(!request.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }
    console.log(request.file);
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, 'storeProfile'));
  } catch(e) {
    next(e);
  }
}

/**
 * 게시글 이미지 저장
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function storePosts(request, response, next) {
  try {
    if(!request.file) {
      throw myError('파일 없음', BAD_FILE_ERROR);
    }
    console.log(request.file);
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, 'storePosts'));
  } catch(e) {
    next(e);
  }
}