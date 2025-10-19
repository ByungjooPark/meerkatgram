/**
 * @file app/controllers/authController.js
 * @description 인증 컨트롤러
 * 251019 v1.0 meerkat
 */

import { SUCCESS } from "../../configs/responseCodeConfig.js";
import { createBaseResponse } from "../utils/createBaseResponse.js";



export const authController = {
  /**
   * 로그인 처리
   * @param {Request} request 
   * @param {Response} response 
   * @param {import("express").NextFunction} next 
   */
  login: async (request, response, next) => {
    try {

      return response
        .status(SUCCESS.status)
        .send(createBaseResponse(SUCCESS, request.body));
    } catch(e) {
      next(e);
    }
  },
}