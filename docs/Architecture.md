# Project Architecture

## Architecture Design

In this project we have used layered architecture also called MVC(Model, View, Controller) / service-layer architecture.

### Project Folder Structure

```txt
Auth-Backend/
└── src/
    ├── server.ts
    ├── app.ts
    ├── routes/
    │   └── user.route.ts
    ├── controllers/
    │   └── user.controller.ts
    ├── services/
    │   └── user.service.ts
    ├── repositories/
    │   └── user.repository.ts
    ├── utils
    ├── middleware/
    │   └── errorHandler.ts
    └── types/
        └── errorType.ts
```

### API Endpoints

- `POST - /api/auth/register`
- `POST - /api/auth/login`
- `POST - /api/auth/refresh`
- `GET - /api/users/me`
- `PATCH - /api/users/me`
- `POST - /api/auth/logout?all-device=true/false`
- `POST - /api/auth/forget-password`
- `POST - /api/auth/reset-password?token=______`