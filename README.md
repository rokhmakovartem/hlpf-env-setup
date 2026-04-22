## Student
- Name: Рохмаков Артем Сергійович
- Group: 232/2 он

## Практичне заняття №7 — Redis + Pagination + Filtering

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
│   │   │   ├── update-product.dto.ts
│   │   │   └── product-query.dto.ts
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
│   ├── seeds/
│   │   └── seed.ts
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
docker compose run --rm app npm run seed
```

### Swagger UI
http://localhost:3000/api/docs

![Swagger](swagger-screenshot.png)

### API: GET /api/products

| Параметр | Тип | Default | Опис |
|----------|-----|---------|------|
| page | number | 1 | Номер сторінки |
| pageSize | number | 10 | Елементів на сторінку (max 100) |
| sort | string | createdAt | Поле сортування |
| order | asc/desc | desc | Напрямок |
| categoryId | number | - | Фільтр за категорією |
| minPrice | number | - | Мінімальна ціна |
| maxPrice | number | - | Максимальна ціна |
| search | string | - | Пошук за назвою (ILIKE) |

### Тест пагінації
```text
curl "http://localhost:3000/api/products?page=1&pageSize=5"

{"data":{"items":[...],"meta":{"page":1,"pageSize":5,"total":32,"totalPages":7}},"statusCode":200,"timestamp":"2026-04-22T17:03:23.923Z"}
```

### Тест фільтрації
```text
curl "http://localhost:3000/api/products?categoryId=1&minPrice=500&sort=price&order=asc"

{"data":{"items":[...],"meta":{"page":1,"pageSize":10,"total":14,"totalPages":2}},"statusCode":200,"timestamp":"2026-04-22T17:03:31.139Z"}
```

### Тест пошуку
```text
curl "http://localhost:3000/api/products?search=mac"

{"data":{"items":[{"id":27,"name":"MacBook Pro v3",...},{"id":17,"name":"MacBook Pro v2",...},{"id":6,"name":"MacBook Pro",...}],"meta":{"page":1,"pageSize":10,"total":3,"totalPages":1}},"statusCode":200,"timestamp":"2026-04-22T17:03:27.552Z"}
```

### Тест валідації (pageSize > 100)
```text
curl "http://localhost:3000/api/products?pageSize=999"

{"error":{"code":400,"message":"Validation failed","details":["pageSize must not be greater than 100"],"traceId":"b671a0bc-cbb4-430a-b6b5-11f954d7f4c9"},"timestamp":"2026-04-22T17:03:34.846Z"}
```

### Тест кешування (Redis)
Кешування реалізовано через `@nestjs/cache-manager` з Redis store.
Ключ кешу формується з query параметрів: `products:${JSON.stringify(query)}`.
TTL = 60 секунд. Інвалідація відбувається при POST/PATCH/DELETE.

### Формат успішної відповіді
```json
{
  "data": {
    "items": [...],
    "meta": {
      "page": 1,
      "pageSize": 10,
      "total": 32,
      "totalPages": 4
    }
  },
  "statusCode": 200,
  "timestamp": "2026-04-22T17:03:23.923Z"
}
```

### Формат помилки
```json
{
  "error": {
    "code": 400,
    "message": "Validation failed",
    "details": ["pageSize must not be greater than 100"],
    "traceId": "b671a0bc-cbb4-430a-b6b5-11f954d7f4c9"
  },
  "timestamp": "2026-04-22T17:03:34.846Z"
}
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