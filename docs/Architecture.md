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
    └── middleware
```