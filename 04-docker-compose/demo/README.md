# Docker Compose 全栈应用 Demo

这是一个完整的全栈应用示例，展示如何使用 Docker Compose 编排多个服务，包括前端、后端、数据库、缓存和消息队列。

## 架构概览

```
┌─────────────┐
│   浏览器     │
└──────┬──────┘
       │ http://localhost:3000
       ▼
┌─────────────────────────────────────┐
│   Frontend (Nginx)                  │
│   - 静态文件服务                     │
│   - API 请求代理                     │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│   Backend (Node.js + Express)       │
│   - RESTful API                     │
│   - 业务逻辑                         │
└─┬───────┬───────────┬───────────────┘
  │       │           │
  ▼       ▼           ▼
┌────┐ ┌────┐ ┌──────────┐
│ PG │ │Redis│ │ RabbitMQ │
└────┘ └────┘ └──────────┘
```

## 服务组成

| 服务 | 技术栈 | 端口 | 说明 |
|------|--------|------|------|
| **frontend** | Nginx | 3000 | 前端静态资源服务 |
| **backend** | Node.js + Express | 8080 | 后端 API 服务 |
| **postgres** | PostgreSQL 15 | 5432 | 关系型数据库 |
| **redis** | Redis 7 | 6379 | 缓存服务 |
| **rabbitmq** | RabbitMQ 3 | 5672, 15672 | 消息队列 |

## 目录结构

```
demo/
├── docker-compose.yml          # Compose 配置文件
├── .env                        # 环境变量
├── init-db.sql                 # 数据库初始化脚本
├── backend/                    # 后端服务
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── frontend/                   # 前端服务
    ├── Dockerfile
    ├── nginx.conf
    └── index.html
```

## 快速开始

### 前置要求

- Docker Desktop 或 Docker Engine (20.10+)
- Docker Compose V2

### 1. 启动所有服务

```bash
# 进入 demo 目录
cd demo

# 后台启动所有服务
docker compose up -d

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f
```

### 2. 访问应用

- **前端应用**: http://localhost:3000
- **后端 API**: http://localhost:8080
- **RabbitMQ 管理界面**: http://localhost:15672
  - 用户名: `demo_user`
  - 密码: `rabbitmq_password_123`

### 3. 测试功能

在浏览器中打开 http://localhost:3000，你可以测试：

1. **用户管理 (PostgreSQL)**
   - 查看用户列表
   - 创建新用户

2. **缓存管理 (Redis)**
   - 设置缓存键值对
   - 获取缓存内容
   - 配置过期时间

3. **消息队列 (RabbitMQ)**
   - 发送消息到队列
   - 消费队列中的消息

4. **服务状态监控**
   - 查看所有服务连接状态
   - 实时统计数据

## 常用命令

### 服务管理

```bash
# 启动服务
docker compose up -d

# 停止服务
docker compose stop

# 停止并删除容器
docker compose down

# 重启服务
docker compose restart

# 重启单个服务
docker compose restart backend

# 查看服务状态
docker compose ps

# 查看资源使用
docker compose top
```

### 日志查看

```bash
# 查看所有服务日志
docker compose logs

# 实时查看日志
docker compose logs -f

# 查看指定服务日志
docker compose logs -f backend

# 查看最后 100 行
docker compose logs --tail=100
```

### 进入容器

```bash
# 进入后端容器
docker compose exec backend sh

# 进入数据库容器
docker compose exec postgres psql -U demo_user -d demo_db

# 进入 Redis
docker compose exec redis redis-cli -a redis_password_123
```

### 构建和更新

```bash
# 重新构建服务
docker compose build

# 重新构建并启动
docker compose up -d --build

# 构建指定服务
docker compose build backend
```

### 数据管理

```bash
# 查看数据卷
docker compose config --volumes
docker volume ls

# 清理所有资源（包括数据卷）
docker compose down -v

# 备份 PostgreSQL 数据
docker compose exec postgres pg_dump -U demo_user demo_db > backup.sql

# 恢复 PostgreSQL 数据
docker compose exec -T postgres psql -U demo_user -d demo_db < backup.sql
```

## API 接口说明

### 健康检查
```
GET /health
```

### 用户管理
```
GET  /api/users          # 获取所有用户
POST /api/users          # 创建用户
Body: { "name": "张三", "email": "zhangsan@example.com" }
```

### 缓存操作
```
GET  /api/cache/:key     # 获取缓存
POST /api/cache          # 设置缓存
Body: { "key": "mykey", "value": "myvalue", "ttl": 3600 }
```

### 消息队列
```
POST /api/message        # 发送消息
Body: { "message": "Hello World" }

GET  /api/messages/consume  # 消费消息
```

### 统计信息
```
GET /api/stats           # 获取统计数据
```

## 环境变量说明

在 `.env` 文件中配置：

```env
# PostgreSQL
POSTGRES_DB=demo_db
POSTGRES_USER=demo_user
POSTGRES_PASSWORD=demo_password_123

# Redis
REDIS_PASSWORD=redis_password_123

# RabbitMQ
RABBITMQ_USER=demo_user
RABBITMQ_PASSWORD=rabbitmq_password_123
```

**注意**: 生产环境请使用更强的密码！

## 故障排查

### 服务无法启动

```bash
# 查看详细日志
docker compose logs backend

# 检查服务健康状态
docker compose ps

# 验证配置文件
docker compose config
```

### 端口冲突

如果端口被占用，修改 `docker-compose.yml` 中的端口映射：

```yaml
services:
  frontend:
    ports:
      - "3001:80"  # 改为其他端口
```

### 数据库连接失败

```bash
# 检查数据库是否就绪
docker compose exec postgres pg_isready -U demo_user

# 查看数据库日志
docker compose logs postgres
```

### 清理并重新开始

```bash
# 停止并删除所有容器、网络、数据卷
docker compose down -v

# 重新启动
docker compose up -d --build
```

## 生产环境优化建议

1. **安全性**
   - 使用强密码
   - 不要提交 `.env` 文件到版本控制
   - 限制数据库和 Redis 只在内网访问
   - 启用 HTTPS

2. **性能**
   - 配置 Redis 持久化策略
   - 调整 PostgreSQL 连接池大小
   - 使用生产级别的 Nginx 配置
   - 设置合理的资源限制

3. **监控**
   - 添加日志聚合工具
   - 配置健康检查
   - 设置告警机制

4. **备份**
   - 定期备份数据库
   - 配置数据卷备份策略

## 扩展学习

- 添加更多服务（如 Elasticsearch、MongoDB）
- 实现服务扩容：`docker compose up -d --scale backend=3`
- 使用 `docker-compose.override.yml` 管理不同环境
- 集成 CI/CD 流程
- 学习 Kubernetes 编排

## 参考资料

- [Docker Compose 官方文档](https://docs.docker.com/compose/)
- [PostgreSQL Docker 镜像](https://hub.docker.com/_/postgres)
- [Redis Docker 镜像](https://hub.docker.com/_/redis)
- [RabbitMQ Docker 镜像](https://hub.docker.com/_/rabbitmq)

## 许可

本项目仅用于学习和演示目的。
