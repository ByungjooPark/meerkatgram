# 프로젝트 개요 — meerkatgram
| 항목            | 내용                                                       |
| ------------- | -------------------------------------------------------- |
| **프로젝트명**     | meerkatgram                                                |
| **설명**        | 사용자들이 게시글과 댓글로 소통하는 커뮤니티형 웹앱                             |
| **핵심 기능**     | 회원가입/로그인(JWT), 소셜 로그인, 권한(Role) 기반 접근, 사진 업로드, PWA 푸시 알림 |
| **사용 기술**     | Vite + React 19 (프론트) / Express 7 (백엔드) / MySQL 8.4 (DB) |
| **추가 기능(선택)** | 모바일 카메라 업로드, 지문 인증(WebAuthn)                             |

<br>

# 프로젝트 구조
````
meerkatgram/
├── client/             # Vite + React (PWA)
│   ├── src/                # React 실행 관련 로직
│   │   ├── assets/             # 비공개 정적 파일
│   │   ├── config/             # 설정 파일 (환경 변수, API 엔드포인트, Firebase/Web Push 설정 등)
│   │   ├── components/         # 컴포넌트
│   │   ├── routes/             # React 라우터
│   │   ├── store/              # 리덕스 관련
│   │   │   ├── slices/            # 리덕스 슬라이스 관련
│   │   │   └── store.js
│   │   ├── utils/              # 유틸
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── sw.js               # service-worker 파일
│   ├── index.html
│   └── vite.config.js
│
├── server/             # Express
│   ├── app/                # Express 실행 관련 로직
│   │   ├── controllers/        # 컨트롤러 레이어
│   │   ├── middlewares/        # 미들웨어 (JWT 인증, 권한 체크, 에러 핸들링, 로깅 등)
│   │   ├── models/             # 모델 (Sequelize 등 모델)
│   │   ├── repositories/       # DB 접근 레이어
│   │   ├── routes/             # API 엔드포인트 정의
│   │   ├── services/           # 비즈니스 로직 레이어
│   │   └── utils/              # 유틸
│   ├── configs/                # 전역 설정 파일 (DB, JWT, OAuth, Push 등)
│   ├── database/           # 데이터베이스 관련
│   │   ├── migrations/         # 마이그레이션 (DB 스키마 작성 파일 등)
│   │   └── seeders/            # 시더 (DB 더미 데이터 생성 파일 등)
│   ├── storage/            # 정적 파일을 서빙 디렉토리 (업로드 파일, PWA build 결과물 저장소), 주의: 운영환경은 경로 다름 
│   ├── app.js              # API 엔트리 포인트
│   └── .env                # 환경 변수 설정 파일
└── READEME.md
````
<br>

# 설치 라이브러리
### client
````
npm create vite@latest .
npm i dayjs react-router-dom @reduxjs/toolkit react-redux axios jwt-decode
npm install -D vite-plugin-pwa
````

### server
````
npm init
npm i express express-validator morgan winston dotenv sequelize sequelize-cli mysql2 cookie-parser jsonwebtoken cors multer swagger-ui-express yaml dayjs bcrypt web-push
npm install -D nodemon
````

<br>

# DB 테이블 설계안
### users (회원 정보)
| 컬럼명           | 타입                              | 설명          |
| ------------- | ------------------------------- | ----------- |
| id            | BIGINT PK AUTO_INCREMENT        | 사용자 ID      |
| email         | VARCHAR(100) UNIQUE             | 이메일(로그인용)   |
| password      | VARCHAR(255)                    | 비밀번호(해시 저장) |
| nick          | VARCHAR(20) UNIQUE                    | 닉네임         |
| provider      | VARCHAR(10)                     | 로그인 제공자(local, google, kakao 등)     |
| role          | VARCHAR(10)                     | 권한(user, admin 등)          |
| profile | VARCHAR(100)                    | 프로필 이미지 경로  |
| created_at    | DATETIME                        | 가입일         |
| updated_at    | DATETIME                        | 수정일         |
| deleted_at    | DATETIME                        | 삭제일         |

### posts (게시글)
| 컬럼명        | 타입                   | 설명         |
| ---------- | -------------------- | ---------- |
| id         | BIGINT PK AUTO_INCREMENT         | 게시글 ID     |
| user_id    | BIGINT FK(users.id)  | 작성자 ID     |
| title      | VARCHAR(200)         | 제목         |
| content    | VARCHAR(1000)                 | 본문         |
| image  | VARCHAR(100)         | 업로드 이미지 경로 |
| created_at    | DATETIME                        | 가입일         |
| updated_at    | DATETIME                        | 수정일         |
| deleted_at    | DATETIME                        | 삭제일         |

### comments (댓글)
| 컬럼명        | 타입                  | 설명         |
| ---------- | ------------------- | ---------- |
| id         | BIGINT PK AUTO_INCREMENT        | 댓글 ID      |
| post_id    | BIGINT FK(posts.id) | 댓글이 달린 게시글 |
| user_id    | BIGINT FK(users.id) | 작성자        |
| content    | VARCHAR(1000)                | 댓글 내용      |
| created_at    | DATETIME                        | 가입일         |
| updated_at    | DATETIME                        | 수정일         |
| deleted_at    | DATETIME                        | 삭제일         |

### likes (좋아요)
| 컬럼명        | 타입                  | 설명         |
| ---------- | ------------------- | ---------- |
| id         | BIGINT PK AUTO_INCREMENT        | 좋아요 ID     |
| post_id    | BIGINT FK(posts.id) | 좋아요 대상 게시글 |
| user_id    | BIGINT FK(users.id) | 누른 사용자     |
| created_at    | DATETIME                        | 가입일         |
| updated_at    | DATETIME                        | 수정일         |
| deleted_at    | DATETIME                        | 삭제일         |

### notifications (PWA 푸시용)
| 컬럼명        | 타입                   | 설명     |
| ---------- | -------------------- | ------ |
| id         | BIGINT PK AUTO_INCREMENT         | 알림 ID  |
| user_id    | BIGINT FK(users.id)  | 알림 대상자 |
| title      | VARCHAR(200)         | 알림 제목  |
| message    | VARCHAR(2000)                 | 알림 내용  |
| is_read    | TINYINT(1) DEFAULT 0 | 읽음 여부  |
| created_at    | DATETIME                        | 가입일         |
| updated_at    | DATETIME                        | 수정일         |
| deleted_at    | DATETIME                        | 삭제일         |

### push_subscriptions (댓글 푸시 정보)
| 컬럼명        | 타입                  | 설명                |
| ---------- | ------------------- | ----------------- |
| id         | BIGINT PK AUTO_INCREMENT        | 구독 ID             |
| user_id    | BIGINT FK(users.id) | 유저                |
| endpoint   | VARCHAR(255)                | Push API endpoint |
| p256dh     | VARCHAR(255)                | 공개키               |
| auth       | VARCHAR(255)                | 인증키               |
| created_at    | DATETIME                        | 가입일         |
| updated_at    | DATETIME                        | 수정일         |
| deleted_at    | DATETIME                        | 삭제일         |

<br>

# 주요 API 설계안 (RESTful)
### Auth (인증)
| Method | Endpoint             | 설명               |
| ------ | -------------------- | ---------------- |
| `POST` | `/api/auth/register` | 회원가입             |
| `POST` | `/api/auth/login`    | 로그인 (JWT 발급)     |
| `POST` | `/api/auth/refresh`  | 토큰 갱신            |
| `POST` | `/api/auth/logout`   | 로그아웃             |
| `GET`  | `/api/auth/google`   | Google 로그인 리다이렉트 |
| `GET`  | `/api/auth/github`   | GitHub 로그인 리다이렉트 |

### User (사용자)
| Method   | Endpoint         | 설명                |
| -------- | ---------------- | ----------------- |
| `GET`    | `/api/users/me`  | 내 정보 조회 (JWT 필요)  |
| `PATCH`  | `/api/users/me`  | 내 프로필 수정          |
| `GET`    | `/api/users`     | [관리자 전용] 모든 유저 조회 |
| `DELETE` | `/api/users/:id` | [관리자 전용] 유저 삭제    |

### Post (게시글)
| Method   | Endpoint              | 설명                  |
| -------- | --------------------- | ------------------- |
| `GET`    | `/api/posts`          | 게시글 목록 조회 (페이지네이션)  |
| `GET`    | `/api/posts/:id`      | 게시글 상세조회            |
| `POST`   | `/api/posts`          | 게시글 작성 (JWT 필요)     |
| `PATCH`  | `/api/posts/:id`      | 게시글 수정 (작성자만)       |
| `DELETE` | `/api/posts/:id`      | 게시글 삭제 (작성자 또는 관리자) |
| `POST`   | `/api/posts/:id/like` | 좋아요 등록              |
| `DELETE` | `/api/posts/:id/like` | 좋아요 취소              |

### Comment (댓글)
| Method   | Endpoint                      | 설명                 |
| -------- | ----------------------------- | ------------------ |
| `GET`    | `/api/posts/:postId/comments` | 특정 게시글의 댓글 목록      |
| `POST`   | `/api/posts/:postId/comments` | 댓글 작성              |
| `DELETE` | `/api/comments/:id`           | 댓글 삭제 (작성자 또는 관리자) |

### Upload (파일 업로드)
| Method | Endpoint             | 설명                  |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/upload`        | 이미지 업로드 (multer 사용) |
| `GET`  | `/uploads/:filename` | 업로드 이미지 접근용         |

### Push Notification (푸시)
| Method  | Endpoint                      | 설명             |
| ------- | ----------------------------- | -------------- |
| `POST`  | `/api/push/subscribe`         | 브라우저 푸시 구독 등록  |
| `POST`  | `/api/push/send`              | 특정 사용자에게 푸시 발송 |
| `GET`   | `/api/notifications`          | 알림 목록 조회       |
| `PATCH` | `/api/notifications/:id/read` | 알림 읽음 처리       |

<br>

# 기본 RESPONSE 양식
### 정상
````
{
  code: '00',
  message: '정상 처리',
  data: [] | {}
}
````
### 에러
````
{
  code: 'E01',
  message: '아이디나 비밀번호가 틀렸습니다.',
  data: null | []
}
````

<br>

# 에러 코드
````
00 : 정상
E01: 미가입 유저 에러
E02: 인증 에러 (로그인 필요)
E03: 권한 에러 (권한 부족)
E20: Not Found Error
E21: 파라미터 에러
E80: DB 에러
E99: 시스템 에러
````

# 명명 규칙
| 구분                     | 예시                                                        | 권장 표기법               | 이유                                                         |
| ---------------------- | --------------------------------------------------------- | -------------------- | ---------------------------------------------------------- |
| **변수명 / 함수명**          | `userName`, `getUserInfo()`                               | **camelCase**        | JS 공식 컨벤션 (ECMAScript 가이드라인)                               |
| **클래스명 / React 컴포넌트명** | `UserController`, `PostList`                              | **PascalCase**       | 생성자/컴포넌트 식별을 명확히 하기 위함                                     |
| **상수 (변하지 않는 값)**      | `MAX_LIMIT`, `JWT_SECRET`                                 | **UPPER_SNAKE_CASE** | 상수임을 직관적으로 표시                                              |
| **파일명 (JS/TS)**        | `userController.js`, `role.enum.js`, `auth.middleware.js` | **kebab-case**       | 파일명은 OS에 따라 대소문자 구분 문제를 피하기 위함 (Linux, macOS, Windows 호환성) |
| **폴더명**                | `controllers/`, `middlewares/`, `services/`               | **kebab-case**       | URL, import 경로와 일관성 유지                                     |
| **URL 경로 / API 엔드포인트** | `/api/user-info`, `/api/posts/:id`                        | **kebab-case**       | SEO 친화적이며, RESTful API 표준 스타일                              |
| **DB 컬럼명**             | `user_name`, `created_at`                                 | **snake_case**       | SQL 관행 (대소문자 구분 없음, 읽기 쉬움)                                 |
