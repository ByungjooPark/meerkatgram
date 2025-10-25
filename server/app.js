/**
 * @file app.js
 * @description 엔트리 포인트
 * 251019 v1.0 meerkat
 */

import express from 'express'; // express 모듈을 가져오기
import cookieParser from 'cookie-parser';
import './configs/envConfig.js';
import errorHandler from './app/errors/errorHandler.js';
import authRouter from './routes/authRouter.js';
import { NOT_FOUND_ERROR } from './configs/responseCodeConfig.js';
import { authMiddleware } from './app/middlewares/auth/authMiddleware.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import fileRouter from './routes/fileRouter.js';
import morganLogger from './app/middlewares/Loggers/morganLogger.js';
import { pathUtil } from './app/utils/pathUtil.js';

const buildPath = pathUtil.getAppDirPath(process.env.STORAGE_DIST_PATH);
const userProfilesPath = pathUtil.getStorageProfileDirPath(process.env.STORAGE_USER_PROFILE_PATH);
const postsImagePath = pathUtil.getStoragePostDirPath(process.env.STORAGE_POST_IMAGE_PATH);

const app = express(); // Express 애플리케이션 인스턴스를 생성
app.use(express.json()); // JSON 요청 파싱 처리
app.use(cookieParser()); // Cookie파서 등록
app.use(morganLogger);

// 정적 파일 제공 등록
app.use('/', express.static(buildPath)); // 퍼블릭 정적파일 제공 활성화
app.use(process.env.STORAGE_USER_PROFILE_PATH, express.static(userProfilesPath)); // 유저 프로필 이미지 제공 활성화
app.use(process.env.STORAGE_POST_IMAGE_PATH, express.static(postsImagePath)); // 게시글 이미지 제공 활성화

// ------- 관리자 기능 -------

// ------- 유저 기능 -------
// 인증 및 인가 미들웨어 등록
app.use(authMiddleware.verifyAuth);

// 라우터 정의
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/file', fileRouter);

// 없는 API는 404 반환
app.all(/^\/api\/.*/, (request, response) => {
    response
      .status(NOT_FOUND_ERROR.status)
      .send(NOT_FOUND_ERROR);
});

// images 제외 요청 뷰 반환
app.get(/^(?!\/images).*/, (request, response) => {
    response.sendFile(join(buildPath, 'index.html'));
});

// Error Handler
app.use(errorHandler);

// 서버를 주어진 포트에서 시작
app.listen(3000, () => {
    console.log(`${3000} 포트 리스닝`);
});