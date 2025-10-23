/**
 * @file app/controllers/userController.js
 * @description user 컨트롤러
 * 251019 v1.0 meerkat
 */

import { SUCCESS } from "../../configs/responseCodeConfig.js";
import { userService } from "../services/userService.js";
import { createBaseResponse } from "../utils/createBaseResponse.js";

/**
 * 회원 가입
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 * @param {import("express").NextFunction} next 
 * @returns {import("express").Response}
 */
async function store(request, response, next) {
  try {
    const result = await userService.registration(request.body);
    
    return response.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(e) {
    next(e);
  }
}

export const userConstroller = {
  store,
}