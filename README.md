## Student
- Name: Рохмаков Артем Сергійович
- Group: 232/2 он

## Практичне заняття №6 — Interceptors + Exception Filters + Swagger

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
│   ├── categories/
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── common/
│   │   ├── enums/
│   │   │   └── role.enum.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   └── pipes/
│   │       └── trim.pipe.ts
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
│   └── app.module.ts
├── swagger-screenshot.png
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```

### Swagger UI
http://localhost:3000/api/docs

![Swagger](swagger-screenshot.png)

### Формат успішної відповіді
```json
{
  "data": { ... },
  "statusCode": 200,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### Формат помилки
```json
{
  "error": {
    "code": 400,
    "message": "Validation failed",
    "details": ["name must be longer than or equal to 2 characters"],
    "traceId": "81e50616-7ec7-40c6-b7ff-9b0c1c7a0e0c"
  },
  "timestamp": "2025-01-15T10:31:00.000Z"
}
```

### Приклад логів (LoggingInterceptor)
```text
[Nest] 29  - 04/20/2026, 12:57:28 PM     LOG [HTTP] GET /api/products — 200 — 12ms
[Nest] 29  - 04/20/2026, 12:57:34 PM   ERROR [Exception] [16336487-c340-4075-845b-5681dabbe4ac] GET /api/products/999 — 404 — Product #999 not found
```

### Тест помилки з traceId
```text
curl http://localhost:3000/api/products/999

{"error":{"code":404,"message":"Product #999 not found","traceId":"16336487-c340-4075-845b-5681dabbe4ac"},"timestamp":"2026-04-20T12:57:34.680Z"}
```

### API Endpoints
| Method | URL | Auth | Role |
|--------|-----|------|------|
| POST | /auth/register | - | - |
| POST | /auth/login | - | - |
| GET | /api/categories | - | - |
| GET | /api/categories/:id | - | - |
| POST | /api/categories | JWT | admin |
| PATCH | /api/categories/:id | JWT | admin |
| DELETE | /api/categories/:id | JWT | admin |
| GET | /api/products | - | - |
| GET | /api/products/:id | - | - |
| POST | /api/products | JWT | admin |
| PATCH | /api/products/:id | JWT | admin |
| DELETE | /api/products/:id | JWT | admin |