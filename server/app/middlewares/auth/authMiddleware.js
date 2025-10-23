/**
 * @file app/middlewares/auth/authMiddleware.js
 * @description auth 미들웨어
 * 251019 v1.0 meerkat
 */

import { FORBIDDEN_ERROR, INVALID_TOKEN_ERROR } from "../../../configs/responseCodeConfig.js";
import { myError } from "../../errors/custom/myError.js";
import { jwtUtil } from "../../utils/jwtUtils.js";
import { rolePermissions } from "./configs/rolePermissions.js";

function authenticate(request) {
  // 토큰 획득
  const token = jwtUtil.getBearerToken(request);

  // 토큰 검증 및 페이로드 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);

  // Request 객체에 사용자 정보 추가
  request.user = {
      userId: parseInt(claims.sub),
      role: claims.role
  };
}

function authorize(request) {
  // 요청에 맞는 권한 규칙 조회
  const matchedRole = rolePermissions[request.method].find(item => {
      return item.path.test(request.path);
  });

  // 일치하는 규칙이 있을 시, 인증 및 권한 체크 실시 (일치하는 규칙 없을 시, 권한 체크 불필요)
  if(matchedRole) {
    // 인증 체크 및 인증 정보 셋
    authenticate(request);
    const userRole = request.user?.role;

    // 유저Role가 없거나, 요청에 맞는 권한이 아닐 경우 에러
    if(!userRole || !matchedRole.roles.includes(userRole)) {
        throw myError('토큰 권한 부족', FORBIDDEN_ERROR);
    }
  }
}

export const authMiddleware = {
    verifyAuth(request, response, next) {
        try {
            authorize(request);

            return next();
        } catch(error) {
            return next(error);
        }
    },
    
}