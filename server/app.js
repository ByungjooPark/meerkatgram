/**
 * @file app.js
 * @description 엔트리 포인트
 * 251019 v1.0 meerkat
 */

import express from 'express'; // express 모듈을 가져오기
import cookieParser from 'cookie-parser';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import './configs/envConfig.js';
import morganConfig from './configs/morganConfig.js';
import errorHandler from './app/errors/errorHandler.js';
import authRouter from './routes/authRouter.js';
import { NOT_FOUND_ERROR } from './configs/responseCodeConfig.js';

const __filename = fileURLToPath(import.meta.url); // 현재 실행중인 파일 경로
const __dirname = dirname(__filename); // 해당 경로에서 디렉토리 경로만 획득
const buildPath = join(__dirname, process.env.STORAGE_DIST_PATH);
const userProfilesPath = join(__dirname, process.env.STORAGE_USER_PROFILE_PATH);
const postsImagePath = join(__dirname, process.env.STORAGE_POST_IMAGE_PATH);

const app = express(); // Express 애플리케이션 인스턴스를 생성
app.use(express.json()); // JSON 요청 파싱 처리
app.use(cookieParser()); // Cookie파서 등록
app.use(morganConfig);

// 정적 파일 제공 등록
app.use('/', express.static(buildPath)); // 퍼블릭 정적파일 제공 활성화
app.use('/images/profiles', express.static(userProfilesPath)); // 유저 프로필 이미지 제공 활성화
app.use('/images/posts', express.static(postsImagePath)); // 게시글 이미지 제공 활성화

// 라우터 정의
app.use('/api/auth', authRouter);

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