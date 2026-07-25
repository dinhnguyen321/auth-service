<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">NestJS Authentication & Authorization</h1>

<p align="center">
Backend API built with NestJS implementing JWT Authentication, Role-Based Authorization (RBAC), TypeORM, and Seed Data.
</p>

---

# 📖 Giới thiệu dự án

Đây là project Backend được xây dựng bằng **NestJS** nhằm mô phỏng hệ thống **Authentication** và **Authorization** theo mô hình thực tế.

Các chức năng chính:

- JWT Authentication
- User Management
- Role-Based Access Control (RBAC)
- Permission Management
- Password Encryption (bcrypt)
- Seed Default Data
- Swagger API Documentation

---

# ⚙️ Công nghệ sử dụng

- NestJS
- TypeScript
- TypeORM
- MySQL
- Passport JWT
- bcrypt
- class-validator
- Swagger

---

# 🚀 Cách cài đặt

Clone project

```bash
git clone <repository-url>
```

Di chuyển vào project

```bash
cd <project-name>
```

Cài đặt thư viện

```bash
npm install
```

---

# 🗄️ Tạo Database

Khởi động ứng dụng để TypeORM tự tạo các bảng.

```bash
npm run start:vite
```

Sau khi chạy thành công, Database sẽ được tạo với các bảng như:

- users
- roles
- permissions
- role_permissions
- user_roles

---

# 🌱 Seed Data

Sau khi Database được tạo, chạy lệnh:

```bash
npm run seed
```

Lệnh này sẽ khởi tạo dữ liệu mặc định cho hệ thống, bao gồm:

### Roles

- ADMIN
- USER

### Permissions

- user.create
- user.read
- user.update
- user.delete

### Default Administrator

Một tài khoản Admin mặc định sẽ được tạo để đăng nhập và quản lý hệ thống.

---

# 🔑 Tài khoản Admin mặc định

Sau khi chạy:

```bash
npm run seed
```

Sử dụng tài khoản sau để đăng nhập.

| Email | Password |
|--------|----------|
| admin@gmail.com | 123456 |

> Password sẽ được mã hóa bằng **bcrypt** trước khi lưu vào Database.

---

# 🔐 Luồng JWT Authentication

```text
Client
   │
   │ Login
   ▼
NestJS Server
   │
   │ Validate Email & Password
   ▼
Database
   │
   │ User Found
   ▼
Generate JWT Access Token
   │
   ▼
Return Access Token
   │
   ▼
Client stores Token
   │
   ▼
Authorization: Bearer <access_token>
   │
   ▼
Protected APIs
```

---

# 📁 Cấu trúc thư mục

```text
src
│
├── auth
│   ├── dto
│   ├── guards
│   ├── strategies
│   ├── decorators
│   └── auth.service.ts
│
├── users
│
├── roles
│
├── permissions
│
├── seed
│
├── common
│
├── config
│
└── main.ts
```

---

# 📌 API Documentation

Sau khi khởi động project:

```bash
npm run start:vite
```

Swagger sẽ được truy cập tại:

```text
http://localhost:3000/api
```

Thông qua Swagger, bạn có thể:

- Authentication
- Login
- User APIs
- Role APIs
- Permission APIs
- Test JWT Authorization

---

# ▶️ Scripts

```bash
# Install dependencies
npm install

# Development
npm run start:vite

# Watch mode
npm run start:dev

# Production
npm run start:prod

# Seed database
npm run seed

# Unit Test
npm run test

# E2E Test
npm run test:e2e

# Coverage
npm run test:cov
```

---

# 📄 License

This project is licensed under the MIT License.