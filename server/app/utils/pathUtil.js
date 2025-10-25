/**
 * @file app/utils/pathUtil.js
 * @description pathUtil 유틸리티
 * 251019 v1.0 meerkat
 */
import path from 'path';

export const pathUtil = {
  getAppDirPath,
  getStorageProfileDirPath,
  getStoragePostDirPath,
  getLogDirPath,
}

function getAppDirPath() {
  const __dirname = process.env.APP_MODE !== 'dev' ? process.env.APP_BASE_PATH : path.join(path.resolve(), 'storage');

  return path.join(__dirname, process.env.APP_DIST_PATH);
}

function getStorageProfileDirPath() {
  const __dirname = process.env.APP_MODE !== 'dev' ? process.env.STORAGE_BASE_PATH : path.join(path.resolve(), 'storage');
  
  return path.join(__dirname, process.env.STORAGE_USER_PROFILE_PATH);
}

function getStoragePostDirPath() {
  const __dirname = process.env.APP_MODE !== 'dev' ? process.env.STORAGE_BASE_PATH : path.join(path.resolve(), 'storage');

  return path.join(__dirname, process.env.STORAGE_POST_IMAGE_PATH);
}

function getLogDirPath(filePath) {
  const __dirname = process.env.APP_MODE !== 'dev' ? process.env.LOG_BASE_PATH : path.join(path.resolve(), 'storage/logs');

  return path.join(__dirname, filePath);
}