## Student
- Name: Рохмаков Артем Сергійович
- Group: 232/2 он
 
## Практичне заняття №2 — NestJS + PostgreSQL + Redis

## Запуск проекту
```bash
cp .env.example .env   # налаштувати значення
docker compose up --build
```
 
## Перевірка сервісів
```text
CONTAINER ID   IMAGE                COMMAND                  CREATED         STATUS                   PORTS                                         NAMES
730797a92a8c   hlpf-env-setup-app   "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes             0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp   hlpf-env-setup-app-1
3296687d7125   postgres:16-alpine   "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   hlpf-env-setup-postgres-1
8e66d0df22c3   redis:7-alpine       "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes (healthy)   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp   hlpf-env-setup-redis-1
```
 
## Перевірка PostgreSQL
```text
                                                      List of databases
   Name    |  Owner   | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules |   Access privileges   
-----------+----------+----------+-----------------+------------+------------+------------+-----------+-----------------------
 nestdb    | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 postgres  | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 template0 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
 template1 | nestuser | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/nestuser          +
           |          |          |                 |            |            |            |           | nestuser=CTc/nestuser
(4 rows)
```
 
## Перевірка Redis
```text
PONG
```
 
## Перевірка застосунку
```text
Hello World!
```
 
## Логи NestJS (фрагмент)
```text
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [NestFactory] Starting Nest application...
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized +26ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [InstanceLoader] ConfigHostModule dependencies initialized +1ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [InstanceLoader] ConfigModule dependencies initialized +0ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [InstanceLoader] CacheModule dependencies initialized +5ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +15ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [RoutesResolver] AppController {/}: +2ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [RouterExplorer] Mapped {/, GET} route +1ms
app-1  | [Nest] 29  - 03/26/2026, 12:28:03 AM     LOG [NestApplication] Nest application successfully started +1ms
```
