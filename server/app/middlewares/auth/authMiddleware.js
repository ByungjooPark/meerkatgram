/**
 * @file app/middlewares/auth/authMiddleware.js
 * @description auth 미들웨어
 * 251019 v1.0 meerkat
 */

import { authConfig } from "../../../config/authConfig.js";
import MyBaseError from "../../errors/MyBaseError.js";
import { jwtUtil } from "../../utils/jwtUtil.js";

function authenticate(request) {
    // 베어러 토큰 획득
    const bearerToken = request.headers[process.env.JWT_HEADER_KEY];
    if(!bearerToken) {
        throw new MyBaseError('E02');
    }

    // 베어러 토큰 형식 검증
    const tokenParts = bearerToken.split((' '));
    if(tokenParts.length !== 2 || tokenParts[0] !== process.env.JWT_SCHEME) {
        throw new MyBaseError('E04');
    }
    const token = tokenParts[1];

    // 토큰 검증 및 페이로드 획득
    const claims = jwtUtil.getClaimsWithVerifyToken(token);

    // Request 객체에 사용자 정보 추가
    request.user = {
        userId: parseInt(claims.sub),
        role: claims.role
    };
}

function authorize(request) {
    const userRole = request.user?.role;

    // 요청에 맞는 권한 규칙 조회
    const matchedRole = authConfig.permissions[request.method].find(item => {
        return item.path.test(request.baseUrl);
    });

    // 일치하는 규칙이 있을 시, 권한 체크 실시 (일치하는 규칙 없을 시, 권한 체크 불필요)
    if(matchedRole) {
        // 유저Role가 없거나, 요청에 맞는 권한이 아닐 경우 에러
        if(!userRole || !matchedRole.roles.includes(userRole)) {
            throw new MyBaseError('E06');
        }
    }
}

export const authMiddleware = {
    verifyAuth(request, response, next) {
        try {
            // 화이트 리스트 체크
            const isWhiteList = authConfig.authWhitelist[request.method].some(item => {
                return item.path.test(request._parsedUrl.pathname);
            });
            
            // 화이트 리스트에 포함되지 않은 요청은 인증 및 인가 체크
            if(!isWhiteList) {
                authenticate(request);
                authorize(request);
            }

            return next();
        } catch (error) {
            return next(error);
        }
    },
    
}