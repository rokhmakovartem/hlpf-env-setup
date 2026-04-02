## Student
- Name: Рохмаков Артем Сергійович
- Group: 232/2 он
 
## Практичне заняття №3 — CRUD REST API для MiniShop

### Структура репозиторію
```
.
├── src/
│   ├── categories/
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── migrations/
│   │   ├── 1700000001-CreateTables.ts
│   │   └── <timestamp>-AddIsActiveToProducts.ts
│   ├── data-source.ts
│   ├── app.module.ts
│   └── main.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
...
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


### Перевірка міграцій
```text
           List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | categories | table | nestuser
 public | migrations | table | nestuser
 public | products   | table | nestuser
(3 rows)
```
 
### Тест створення категорії
```text
{"id":1,"name":"Electronics","description":"Electronic devices","createdAt":"2026-04-02T11:17:19.922Z"}
```
 
### Тест створення продукту
```text
{"id":1,"name":"Laptop","description":"Gaming laptop","price":999.99,"stock":10,"isActive":true,"category":{"id":1},"createdAt":"2026-04-02T11:22:14.264Z","updatedAt":"2026-04-02T11:22:14.264Z"}
```
 
### Тест отримання продуктів
```text
[{"id":1,"name":"Laptop","description":"Gaming laptop","price":"999.99","stock":10,"isActive":true,"category":{"id":1,"name":"Electronics","description":"Electronic devices","createdAt":"2026-04-02T11:17:19.922Z"},"createdAt":"2026-04-02T11:22:14.264Z","updatedAt":"2026-04-02T11:22:14.264Z"}]
```
 
### Тест 404
```text
{"message":"Cannot GET /api/fsff/ddfsfs","error":"Not Found","statusCode":404}
```
