/**
 * @file app/controllers/authController.js
 * @description 인증 컨트롤러
 * 251019 v1.0 meerkat
 */

import { SUCCESS } from "../../configs/responseCodeConfig.js";
import { authService } from "../services/authService.js";
import { cookieUtils } from "../utils/cookieUtils.js";
import { createBaseResponse } from "../utils/createBaseResponse.js";

export const authController = {
  login,
}

// ---------------------
// ------ public -------
// ---------------------
/**
 * 로그인 처리
 * @param {Request} request 
 * @param {Response} response 
 * @param {import("express").NextFunction} next 
 */
async function login(request, response, next) {
  try {
    // 로그인 처리
    const { accessToken, refreshToken, user } = await authService.login(request.body);

    // 쿠키에 리프래시토큰 설정
    cookieUtils.setCookieRefreshToken(response, refreshToken);

    return response
      .status(SUCCESS.status)
      .send(createBaseResponse(SUCCESS, {accessToken, user}));
  } catch(e) {
    next(e);
  }
}