/**
 * @file app/middlewares/multer/multerMiddleware.js
 * @description multerMiddleware
 * 251019 v1.0 meerkat
 */

import { postUploder } from "./uploders/postUploder.js";
import { profileUploder } from "./uploders/profileUploder.js";

export const multerMiddleware = {
  postUploder,
  profileUploder,
}