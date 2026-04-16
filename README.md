## Student
- Name: Рохмаков Артем Сергійович
- Group: 232/2 он
 
## Практичне заняття №4 — DTO + class-validator + Pipes

### Структура репозиторію
```
.
├── src/
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
│   │   └── pipes/
│   │   	└── trim.pipe.ts
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Запуск проекту
```bash
cp .env.example .env   # налаштувати значення
docker compose up --build
```

### API Endpoints
| Method | URL | Опис |
|--------|-----|------|
| GET | /api/categories | Список категорій |
| GET | /api/categories/:id | Одна категорія |
| POST | /api/categories | Створити категорію |
| PATCH | /api/categories/:id | Оновити категорію |
| DELETE | /api/categories/:id | Видалити категорію |
| GET | /api/products | Список продуктів |
| GET | /api/products/:id | Один продукт |
| POST | /api/products | Створити продукт |
| PATCH | /api/products/:id | Оновити продукт |
| DELETE | /api/products/:id | Видалити продукт |


### Тест валідації — порожнє ім'я категорії
```text
{"message":["name must be longer than or equal to 2 characters"],"error":"Bad Request","statusCode":400}
```
 
### Тест валідації — від'ємна ціна продукту
```text
{"message":["price must not be less than 0.01"],"error":"Bad Request","statusCode":400}
```
 
### Тест валідації — зайве поле
```text
{"message":["property isAdmin should not exist"],"error":"Bad Request","statusCode":400}
```
 
### Тест TrimPipe
```text
{"id":4,"name":"Trimmed","description":null,"createdAt":"2026-04-16T13:32:19.111Z"}
```
 
### Тест валідне створення продукту
```text
{"id":2,"name":"iPhone 16","description":null,"price":999.99,"stock":50,"isActive":true,"category":{"id":1},"createdAt":"2026-04-16T13:31:03.664Z","updatedAt":"2026-04-16T13:31:03.664Z"}
```
