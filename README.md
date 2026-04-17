## Student
- Name: Рохмаков Артем Сергійович
- Group: 232/2 он

## Практичне заняття №5 — JWT Authentication + Guards + RBAC

### Структура репозиторію
```
.
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   ├── register.dto.ts
│   │   │   └── login.dto.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── auth.controller.ts
│   ├── users/
│   │   ├── user.entity.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── common/
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   └── pipes/
│   │       └── trim.pipe.ts
│   ├── categories/ ...
│   ├── products/ ...
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```

### API Endpoints
| Method | URL | Auth | Role |
|--------|-----|------|------|
| POST | /auth/register | - | - |
| POST | /auth/login | - | - |
| GET | /api/categories | - | - |
| POST | /api/categories | JWT | admin |
| PATCH | /api/categories/:id | JWT | admin |
| DELETE | /api/categories/:id | JWT | admin |
| GET | /api/products | - | - |
| POST | /api/products | JWT | admin |
| PATCH | /api/products/:id | JWT | admin |
| DELETE | /api/products/:id | JWT | admin |

### Тест реєстрації
```text
{"id":3,"email":"newuser@test.com","name":"Test User","role":"user","createdAt":"2026-04-17T18:59:19.096Z"}
```

### Тест логіну
```text
{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoibmV3dXNlckB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzc2NDUyMzY5LCJleHAiOjE3NzY0NTU5Njl9.PXGePM1YK1Z1NNpmZdwdiwaXgALpWIIEPBRatLtW2kQ"}
```

### Тест 401 — запит без токена
```text
{"message":"Missing authorization token","error":"Unauthorized","statusCode":401}
```

### Тест 403 — запит з роллю user
```text
{"message":"Insufficient permissions","error":"Forbidden","statusCode":403}
```

### Тест успішного створення від admin
```text
{"id":3,"name":"MacBook Pro","description":null,"price":2499.99,"stock":10,"isActive":true,"createdAt":"2026-04-17T18:59:59.985Z","updatedAt":"2026-04-17T18:59:59.985Z"}
```