/**
 * @file app/services/userService.js
 * @description user 서비스
 * 251019 v1.0 meerkat
 */

import bcrypt from 'bcrypt';
import db from '../models/index.js';
import { userRepository } from "../repositories/userRepositories.js";
import Provider from '../middlewares/auth/configs/providerEnum.js';
import { myError } from '../errors/custom/myError.js';
import { CONFLICT_ERROR } from '../../configs/responseCodeConfig.js';
import Role from '../middlewares/auth/configs/roleEnum.js';

async function registration(body) {
  await db.sequelize.transaction(async t => {
    // 중복 가입 체크
    const resultUser = await userRepository.findByEmail(t, body.email);
    
    if(resultUser) {
      throw myError('중복 가입 체크', CONFLICT_ERROR);
    }

    // 가입 처리
    const data = {
      email: body.email,
      password: bcrypt.hashSync(body.password, parseInt(process.env.ENCRYPT_SALT_LENGTH)),
      nick: body.nick,
      provider: Provider.NONE,
      role: Role[body.role],
      profile: '/base.png',
    }
  
    const result = await userRepository.store(t, data);

    return result;
  });
}


export const userService = {
  registration,
}