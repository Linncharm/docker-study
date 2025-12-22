# 第四阶段：Docker Compose

## 学习目标
- 理解 Docker Compose 的作用和应用场景
- 掌握 docker-compose.yml 文件的编写
- 能够使用 Compose 管理多容器应用
- 学会配置服务依赖和网络

## 学习时间
预计 2 周

## 学习内容

### 01-basics（Compose 基础）

#### 什么是 Docker Compose？

Docker Compose 是一个用于定义和运行多容器 Docker 应用的工具。通过 YAML 文件配置应用的服务，一条命令即可创建并启动所有服务。

**解决的问题：**
- 避免复杂的 docker run 命令
- 统一管理多个容器
- 定义容器间的依赖关系
- 简化开发和测试环境

#### 安装 Docker Compose

```bash
# Docker Desktop 已内置 Compose V2
docker compose version

# Linux 单独安装（如需要）
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 第一个 Compose 项目

**docker-compose.yml：**
```yaml
version: '3.8'

services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
```

**运行：**
```bash
# 启动服务
docker compose up -d

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs

# 停止服务
docker compose down
```

#### 实践任务
- [ ] 安装并验证 Docker Compose
- [ ] 创建第一个 compose 文件
- [ ] 使用 compose 启动和停止服务
- [ ] 查看服务日志

### 02-compose-file（Compose 文件编写）

#### 文件结构

```yaml
version: '3.8'  # Compose 文件版本

services:       # 定义服务
  service1:
    # 服务配置
  service2:
    # 服务配置

networks:       # 定义网络（可选）
  network1:

volumes:        # 定义数据卷（可选）
  volume1:
```

#### 服务配置详解

**1. 镜像和构建**
```yaml
services:
  # 使用已有镜像
  web:
    image: nginx:latest

  # 从 Dockerfile 构建
  app:
    build: .

  # 指定构建上下文和 Dockerfile
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
      args:
        - NODE_ENV=production
```

**2. 端口映射**
```yaml
services:
  web:
    ports:
      - "8080:80"          # 宿主机:容器
      - "8443:443"
      - "127.0.0.1:3000:3000"  # 绑定到特定 IP
```

**3. 环境变量**
```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - DEBUG=false
    # 或从文件加载
    env_file:
      - .env
      - .env.production
```

**4. 数据卷**
```yaml
services:
  db:
    volumes:
      - db-data:/var/lib/mysql           # 命名卷
      - ./config:/etc/mysql/conf.d       # 绑定挂载
      - /tmp:/tmp:ro                     # 只读挂载
      - type: tmpfs                      # tmpfs 挂载
        target: /app/cache

volumes:
  db-data:  # 声明命名卷
```

**5. 网络配置**
```yaml
services:
  web:
    networks:
      - frontend
      - backend

  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

**6. 依赖关系**
```yaml
services:
  web:
    depends_on:
      - db
      - redis

  # 带健康检查的依赖（Compose V2.1+）
  web:
    depends_on:
      db:
        condition: service_healthy

  db:
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
```

**7. 重启策略**
```yaml
services:
  app:
    restart: always
    # no（默认）、always、on-failure、unless-stopped
```

**8. 资源限制**
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

**9. 容器名称和主机名**
```yaml
services:
  web:
    container_name: my-web-container
    hostname: webserver
```

**10. 命令和入口点**
```yaml
services:
  app:
    command: npm start
    # 或
    command: ["npm", "start"]

    entrypoint: /app/entrypoint.sh
    # 或
    entrypoint: ["sh", "-c", "/app/entrypoint.sh"]
```

#### 完整示例

```yaml
version: '3.8'

services:
  # 前端
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - API_URL=http://backend:8080
    depends_on:
      - backend
    networks:
      - app-network
    restart: unless-stopped

  # 后端
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=database
      - DB_NAME=myapp
      - DB_USER=appuser
      - DB_PASSWORD=apppass
      - REDIS_URL=redis://cache:6379
    env_file:
      - .env
    depends_on:
      database:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./backend/logs:/app/logs
    networks:
      - app-network
    restart: unless-stopped

  # 数据库
  database:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=appuser
      - POSTGRES_PASSWORD=apppass
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # 缓存
  cache:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - app-network
    restart: unless-stopped

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
```

#### 实践任务
- [ ] 编写包含多个服务的 compose 文件
- [ ] 配置服务间的依赖关系
- [ ] 使用环境变量和 .env 文件
- [ ] 配置健康检查
- [ ] 设置资源限制

### 03-commands（Compose 命令）

#### 基础命令

```bash
# 启动服务（前台）
docker compose up

# 启动服务（后台）
docker compose up -d

# 启动指定服务
docker compose up -d web db

# 停止并删除容器、网络
docker compose down

# 停止但保留容器
docker compose stop

# 启动已停止的容器
docker compose start

# 重启服务
docker compose restart
```

#### 构建相关

```bash
# 构建或重新构建服务
docker compose build

# 构建时不使用缓存
docker compose build --no-cache

# 构建指定服务
docker compose build web

# 启动时重新构建
docker compose up -d --build
```

#### 查看和日志

```bash
# 查看服务状态
docker compose ps

# 查看所有容器（包括停止的）
docker compose ps -a

# 查看日志
docker compose logs

# 实时查看日志
docker compose logs -f

# 查看指定服务日志
docker compose logs -f web

# 显示最后 100 行日志
docker compose logs --tail=100
```

#### 执行命令

```bash
# 在运行的容器中执行命令
docker compose exec web sh
docker compose exec db psql -U postgres

# 运行一次性命令（创建新容器）
docker compose run web npm test
docker compose run --rm web npm install

# 不启动依赖服务
docker compose run --no-deps web npm test
```

#### 扩容和资源管理

```bash
# 扩展服务实例数量
docker compose up -d --scale web=3

# 查看资源使用
docker compose top

# 暂停服务
docker compose pause

# 恢复服务
docker compose unpause
```

#### 配置和验证

```bash
# 验证 compose 文件
docker compose config

# 查看配置（合并后的最终配置）
docker compose config

# 查看服务配置
docker compose config --services

# 查看数据卷
docker compose config --volumes
```

#### 清理

```bash
# 停止并删除容器、网络、默认卷
docker compose down

# 同时删除镜像
docker compose down --rmi all

# 删除数据卷
docker compose down -v

# 删除孤立容器
docker compose down --remove-orphans
```

#### 实践任务
- [ ] 使用各种 compose 命令管理服务
- [ ] 查看和调试服务日志
- [ ] 在容器中执行命令
- [ ] 扩展服务实例
- [ ] 验证 compose 配置文件

### 04-practice（实战项目）

#### 项目一：LNMP 架构（Linux + Nginx + MySQL + PHP）

**目录结构：**
```
lnmp/
├── docker-compose.yml
├── nginx/
│   └── default.conf
├── php/
│   └── Dockerfile
└── www/
    └── index.php
```

**docker-compose.yml：**
```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./www:/var/www/html
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - php
    networks:
      - lnmp

  php:
    build: ./php
    volumes:
      - ./www:/var/www/html
    networks:
      - lnmp

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: test
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - lnmp

networks:
  lnmp:

volumes:
  mysql-data:
```

#### 项目二：微服务应用（前端 + 后端 + 数据库 + Redis）

**docker-compose.yml：**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:8080

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - postgres
      - redis
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/mydb
      - REDIS_URL=redis://redis:6379

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data

volumes:
  postgres-data:
  redis-data:
```

#### 项目三：开发环境（支持热更新）

**docker-compose.dev.yml：**
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src          # 代码热更新
      - ./public:/app/public
      - /app/node_modules       # 避免覆盖 node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

**使用：**
```bash
docker compose -f docker-compose.dev.yml up
```

#### 项目四：多环境配置

```bash
# 生产环境
docker compose -f docker-compose.yml up -d

# 开发环境
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# 测试环境
docker compose -f docker-compose.yml -f docker-compose.test.yml up -d
```

**docker-compose.yml（基础配置）：**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
```

**docker-compose.dev.yml（开发覆盖）：**
```yaml
version: '3.8'

services:
  app:
    build:
      dockerfile: Dockerfile.dev
    volumes:
      - ./src:/app/src
    environment:
      - NODE_ENV=development
```

## 最佳实践

### 1. 使用 .env 文件管理环境变量

**.env：**
```env
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb
API_PORT=8080
```

**docker-compose.yml：**
```yaml
services:
  db:
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}

  api:
    ports:
      - "${API_PORT}:8080"
```

### 2. 健康检查

```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### 3. 日志配置

```yaml
services:
  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### 4. 使用 profiles（Compose V2.0+）

```yaml
services:
  app:
    profiles: ["production"]

  debug:
    profiles: ["debug"]
```

```bash
# 只启动 production profile 的服务
docker compose --profile production up
```

## 常见问题

1. **服务启动顺序问题？**
   - 使用 `depends_on` 配置依赖
   - 配合 `healthcheck` 确保服务就绪
   - 应用层实现重试逻辑

2. **数据持久化？**
   - 使用命名卷（volumes）
   - 定期备份重要数据

3. **网络隔离？**
   - 创建多个网络分隔服务
   - 只暴露必要的端口

## 学习检验

完成本阶段后，你应该能够：
- [ ] 理解 Docker Compose 的作用
- [ ] 编写规范的 docker-compose.yml 文件
- [ ] 使用 Compose 管理多容器应用
- [ ] 配置服务依赖和健康检查
- [ ] 使用环境变量和多环境配置
- [ ] 处理常见的 Compose 问题

## 下一步
完成本阶段学习后，进入 [第五阶段：Docker 运维实践](../05-operations/README.md)
