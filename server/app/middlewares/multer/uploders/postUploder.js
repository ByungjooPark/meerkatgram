/**
 * @file app/middlewares/multer/uploders/postUploder.js
 * @description postUploder
 * 251019 v1.0 meerkat
 */

import multer from 'multer';
import fs from 'fs';
import dayjs from 'dayjs';
import { BAD_FILE_ERROR } from '../../../../configs/responseCodeConfig.js';
import { myError } from '../../../errors/custom/myError.js';
import { pathUtil } from '../../../utils/pathUtil.js';

export function postUploder(request, response, next) {
  const upload = multer({
    storage: multer.diskStorage({
      // 파일 저장 경로 설정
      destination(request, file, callback) {
        const fullPath = pathUtil.getStoragePostDirPath(); // 파일 저장 디렉토리 생성
  
        // 저장 디렉토리 체크
        if(!fs.existsSync(fullPath)) {
          // 없으면 생성
          fs.mkdirSync(
            fullPath,
            {
              recursive: true, // 중간 디렉토리까지 모두 생성
              mode: 0o755 // rwxr-xr-x
            }
          );
        }
  
        callback(null, fullPath);
      },
      // 파일명 설정 함수
      filename(request, file, callback) {

        // 저장할 파일명 생성
        const uniqueFileName = `${dayjs().format('YYYYMMDD')}_${crypto.randomUUID()}`;
        const fileNameArr = file.originalname.split('.');
        const ext = fileNameArr[fileNameArr.length - 1];
  
        callback(null, `${uniqueFileName}.${ext}`);
      }
    }),
    // 파일 유효성 체크
    fileFilter(request, file, callback) {
      if(!file.mimetype.startsWith('image/')) {
        return callback(myError('이미지 파일 아님', BAD_FILE_ERROR));
      }
  
      callback(null, true);
    },
    limits: { fileSize: parseInt(process.env.STORAGE_FILE_MAX_SIZE) } // 사이즈 제한
  }).single('image');

  // 예외 처리
  upload(request, response, function (error) {
    if(error instanceof multer.MulterError || error) {
      next(myError(error.message, BAD_FILE_ERROR));
    }

    next();
  });
}