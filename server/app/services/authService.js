/**
 * @file app/services/authService.js
 * @description auth 서비스
 * 251019 v1.0 meerkat
 */

import bcrypt from 'bcrypt';
import { NOT_REGISTERED_ERROR, REISSUE_ERROR } from "../../configs/responseCodeConfig.js";
import { userRepository } from "../repositories/userRepositories.js"
import { myError } from '../errors/custom/myError.js';
import { jwtUtil } from '../utils/jwtUtils.js';
import db from '../models/index.js';

async function login(body) {
  return await db.sequelize.transaction(async t => {
    const {email, password} = body;
  
    // 유저정보 획득
    const user = await userRepository.findByEmail(t, email);
  
    // 미가입 체크
    if(!user) {
      throw myError('미가입 회원', NOT_REGISTERED_ERROR);
    }
  
    // 비밀번호 체크
    if(!bcrypt.compareSync(password, user.password)){
      throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR)
    }
  
    // JWT 생성
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);
  
    // RefreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.update(t, user);

    return {
      accessToken,
      refreshToken,
      user
    };
  });
}

async function reissue(token) {
  // 리프래시 토큰 존재 여부 채크
  if(!token) {
    throw myError('리프래시 토큰 없음', REISSUE_ERROR)
  }

  // 유저 id 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);
  const userId = claims.sub;

  return await db.sequelize.transaction(async t => {
    // 유저정보 획득
    const user = await userRepository.findByPk(t, userId);

    // 리프래시 토큰 확인
    if(token !== user.refreshToken) {
      throw myError('리프래시 토큰 다름', REISSUE_ERROR)
    }
  
    // JWT 생성
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);
  
    // RefreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.update(t, user);

    return {
      accessToken,
      refreshToken,
      user
    };
  });
}

export const authService = {
  login,
  reissue,
}