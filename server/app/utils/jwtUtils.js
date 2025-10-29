/**
 * @file app/utils/jwtUtils.js
 * @description jwt 유틸리티
 * 251019 v1.0 meerkat
 */

import jwt from 'jsonwebtoken';
import { myError } from '../errors/custom/myError.js';
import { EXPIRED_TOKEN_ERROR, INVALID_TOKEN_ERROR, UNAUTHORIZED_ERROR } from '../../configs/responseCodeConfig.js';

export const jwtUtil = {
  generateAccessToken,
  generateRefreshToken,
  getClaimsWithVerifyToken,
  getBearerToken,
};

// ---------------------
// ------ Private -------
// ---------------------
/**
 * JWT 생성
 * @param {{}} payload 
 * @param {number} ttl
 * @returns {string} JWT 문자열
 */
function generateToken(payload, ttl) {
    // 옵션 설정
    const options = {
        algorithm: process.env.JWT_ALGORITHM // 알고리즘 방식 설정
        ,noTimestamp: false // payload.iat 셋 (토큰 발급 시간)
        ,expiresIn: ttl // payload.exp 셋 (토큰 만료 시간) 초단위
        ,issuer: process.env.JWT_ISSUER // payload.iss 셋 (토큰 발급자)
    }
    
    // 토큰 생성
    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// ---------------------
// ------ public -------
// ---------------------
/**
 * 엑세스 토큰 생성
 * @param {import('../models/User').User} userInfo 
 * @returns {string} JWT 문자열
 */
function generateAccessToken(userInfo) {
    // 페이로드 설정
    const payload = {
        sub: userInfo.id, // payload.sub 셋 (user pk)
        role: userInfo.role // payload.role 셋 (user role)
    }
    return generateToken(payload, parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY));
}

/**
 * 리프래시 토큰 생성
 * @param {import('../models/User').User} userInfo 
 * @returns {string} JWT 문자열
 */
function generateRefreshToken(userInfo) {
    // 페이로드 설정
    const payload = {
        sub: userInfo.id // payload.sub 셋 (user pk)
    }
    return generateToken(payload, parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY));
}

/**
 * 토큰 검증 및 클레임 반환
 * @param {string} token 
 * @returns {jwt.Jwt} payload
 */
function getClaimsWithVerifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError) {
            throw myError('토큰 만료', EXPIRED_TOKEN_ERROR);
        } else if(error instanceof jwt.JsonWebTokenError) {
            throw myError('토큰 이상', INVALID_TOKEN_ERROR);
        } else {
            throw error;
        }
    }
}

/**
 * 
 * @param {Request} request - Request 객체
 * @returns {string} token
 */
function getBearerToken(request) {
  // 베어러 토큰 획득
  const bearerToken = request.headers[process.env.JWT_HEADER_KEY];
  if(!bearerToken) {
      throw myError('베어러 토큰 없음(로그인 필요)', UNAUTHORIZED_ERROR);
  }

  // 베어러 토큰 형식 검증
  const tokenParts = bearerToken.split((' '));
  if(tokenParts.length !== 2 || tokenParts[0] !== process.env.JWT_SCHEME) {
      throw myError('베어러 토큰 형식 이상', INVALID_TOKEN_ERROR);
  }
  return tokenParts[1];
}