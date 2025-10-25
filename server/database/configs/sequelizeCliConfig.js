/**
 * @file database/configs/SequelizeCliConfig.js
 * @description sequelize-Cli 설정 파일
 * 251019 v1.0 meerkat
 */

import '../../configs/envConfig.js';

export default {
  "development": {
    "username": process.env.DB_MYSQL_USER,
    "password": process.env.DB_MYSQL_PASSWORD,
    "database": process.env.DB_MYSQL_DB_NAME,
    "host": process.env.DB_MYSQL_HOST,
    "port": process.env.DB_MYSQL_PORT,
    "dialect": process.env.DB_MYSQL_DIALECT,
    "timezone": process.env.DB_MYSQL_TIMEZONE
  },
  "test": {
    "username": process.env.DB_MYSQL_USER,
    "password": process.env.DB_MYSQL_PASSWORD,
    "database": process.env.DB_MYSQL_DB_NAME,
    "host": process.env.DB_MYSQL_HOST,
    "port": process.env.DB_MYSQL_PORT,
    "dialect": process.env.DB_MYSQL_DIALECT,
    "timezone": process.env.DB_MYSQL_TIMEZONE
  },
  "production": {
    "username": process.env.DB_MYSQL_USER,
    "password": process.env.DB_MYSQL_PASSWORD,
    "database": process.env.DB_MYSQL_DB_NAME,
    "host": process.env.DB_MYSQL_HOST,
    "port": process.env.DB_MYSQL_PORT,
    "dialect": process.env.DB_MYSQL_DIALECT,
    "timezone": process.env.DB_MYSQL_TIMEZONE
  },
}