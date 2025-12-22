# 第三阶段：Docker 网络与存储

## 学习目标
- 理解 Docker 的网络模型和工作原理
- 掌握容器间的网络通信
- 理解 Docker 的数据持久化方案
- 能够配置和管理容器网络和存储

## 学习时间
预计 2 周

## 学习内容

### 01-network（Docker 网络）

#### 网络模式

Docker 提供了多种网络模式：

**1. bridge（桥接网络）- 默认模式**
```bash
# 创建容器，默认使用 bridge 网络
docker run -d --name web nginx

# 查看网络
docker network ls
docker network inspect bridge
```

**2. host（主机网络）**
```bash
# 容器使用宿主机网络栈
docker run -d --network host --name web nginx
# 容器直接使用宿主机的端口，无需映射
```

**3. none（无网络）**
```bash
# 容器没有网络接口
docker run -d --network none --name isolated nginx
```

**4. container（容器网络）**
```bash
# 共享另一个容器的网络命名空间
docker run -d --name web1 nginx
docker run -d --network container:web1 --name web2 nginx
```

#### 自定义网络

```bash
# 创建自定义桥接网络
docker network create mynet

# 查看网络详情
docker network inspect mynet

# 使用自定义网络运行容器
docker run -d --name web --network mynet nginx
docker run -d --name db --network mynet mysql

# 在自定义网络中，容器可以通过名称互相访问
docker exec web ping db
```

#### 容器互联

**方式一：使用自定义网络（推荐）**
```bash
docker network create app-network
docker run -d --name db --network app-network mysql
docker run -d --name web --network app-network nginx
# web 容器可以通过 db 主机名访问数据库
```

**方式二：--link（已废弃，不推荐）**
```bash
docker run -d --name db mysql
docker run -d --name web --link db:database nginx
```

#### 端口映射

```bash
# 映射单个端口
docker run -d -p 8080:80 nginx

# 映射多个端口
docker run -d -p 8080:80 -p 8443:443 nginx

# 映射到指定 IP
docker run -d -p 127.0.0.1:8080:80 nginx

# 随机端口映射
docker run -d -p 80 nginx
docker ps  # 查看映射的随机端口
```

#### 网络管理命令

```bash
# 列出所有网络
docker network ls

# 查看网络详情
docker network inspect mynet

# 创建网络
docker network create --driver bridge --subnet 172.20.0.0/16 mynet

# 连接容器到网络
docker network connect mynet container-name

# 断开容器网络
docker network disconnect mynet container-name

# 删除网络
docker network rm mynet

# 清理未使用的网络
docker network prune
```

#### 实践任务
- [ ] 创建自定义网络并运行多个容器
- [ ] 实现容器间通过主机名通信
- [ ] 测试不同网络模式的区别
- [ ] 理解端口映射的原理

**实践项目：Web + DB 分离部署**
```bash
# 创建网络
docker network create webapp-net

# 运行 MySQL
docker run -d \
  --name mysql \
  --network webapp-net \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=myapp \
  mysql:8.0

# 运行 Web 应用（可以通过 mysql 主机名连接数据库）
docker run -d \
  --name webapp \
  --network webapp-net \
  -p 8080:80 \
  -e DB_HOST=mysql \
  -e DB_NAME=myapp \
  your-webapp:latest
```

### 02-storage（Docker 存储）

#### 存储类型

**1. Volume（数据卷）- 推荐**
```bash
# 创建数据卷
docker volume create mydata

# 使用数据卷
docker run -d -v mydata:/app/data --name app nginx

# 查看数据卷
docker volume ls
docker volume inspect mydata

# 删除数据卷
docker volume rm mydata

# 清理未使用的数据卷
docker volume prune
```

**2. Bind Mount（绑定挂载）**
```bash
# 挂载宿主机目录
docker run -d \
  -v /host/path:/container/path \
  --name app nginx

# 使用绝对路径
docker run -d \
  -v $(pwd)/html:/usr/share/nginx/html \
  --name web nginx

# 只读挂载
docker run -d \
  -v $(pwd)/config:/etc/config:ro \
  --name app nginx
```

**3. tmpfs（临时文件系统）**
```bash
# 挂载到内存
docker run -d \
  --tmpfs /tmp:rw,size=100m \
  --name app nginx
```

#### Volume vs Bind Mount

| 特性 | Volume | Bind Mount |
|------|--------|------------|
| 管理方式 | Docker 管理 | 用户管理 |
| 存储位置 | Docker 目录 | 任意位置 |
| 性能 | 更好（尤其在 Mac/Windows） | 较好 |
| 备份迁移 | 方便 | 依赖宿主机路径 |
| 推荐场景 | 生产环境 | 开发环境 |

#### 数据持久化最佳实践

**1. 数据库持久化**
```bash
# MySQL 持久化
docker run -d \
  --name mysql \
  -v mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root123 \
  mysql:8.0

# PostgreSQL 持久化
docker run -d \
  --name postgres \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=root123 \
  postgres:15
```

**2. 应用配置持久化**
```bash
docker run -d \
  --name app \
  -v app-config:/app/config \
  -v app-logs:/app/logs \
  myapp:latest
```

**3. 日志持久化**
```bash
docker run -d \
  --name nginx \
  -v nginx-logs:/var/log/nginx \
  nginx:latest
```

#### 备份和恢复

**备份数据卷：**
```bash
# 方式一：使用临时容器
docker run --rm \
  -v mydata:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/mydata-backup.tar.gz -C /data .

# 方式二：直接复制（需要知道数据卷路径）
docker volume inspect mydata
# 找到 Mountpoint，然后复制该目录
```

**恢复数据卷：**
```bash
# 创建新的数据卷
docker volume create mydata-restored

# 恢复数据
docker run --rm \
  -v mydata-restored:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/mydata-backup.tar.gz -C /data
```

#### 存储驱动

Docker 支持多种存储驱动：
- **overlay2**（推荐，Linux 默认）
- **aufs**（旧版 Ubuntu）
- **devicemapper**（CentOS 7）
- **btrfs**
- **zfs**

```bash
# 查看当前存储驱动
docker info | grep "Storage Driver"
```

#### 实践任务
- [ ] 创建和管理数据卷
- [ ] 使用 Bind Mount 挂载本地目录
- [ ] 实现数据库数据持久化
- [ ] 备份和恢复数据卷
- [ ] 理解不同存储类型的使用场景

### 03-practice（综合实践）

#### 项目一：WordPress + MySQL 完整部署

```bash
# 创建网络
docker network create wordpress-net

# 创建数据卷
docker volume create mysql-data
docker volume create wordpress-data

# 运行 MySQL
docker run -d \
  --name wordpress-db \
  --network wordpress-net \
  -v mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppass \
  mysql:8.0

# 运行 WordPress
docker run -d \
  --name wordpress \
  --network wordpress-net \
  -p 8080:80 \
  -v wordpress-data:/var/www/html \
  -e WORDPRESS_DB_HOST=wordpress-db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppass \
  -e WORDPRESS_DB_NAME=wordpress \
  wordpress:latest

# 访问 http://localhost:8080 完成 WordPress 安装
```

#### 项目二：多容器应用（前端 + 后端 + 数据库）

```bash
# 创建网络
docker network create fullstack-net

# 运行 PostgreSQL
docker run -d \
  --name db \
  --network fullstack-net \
  -v postgres-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=root123 \
  -e POSTGRES_DB=appdb \
  postgres:15

# 运行后端 API
docker run -d \
  --name backend \
  --network fullstack-net \
  -e DB_HOST=db \
  -e DB_NAME=appdb \
  your-backend:latest

# 运行前端
docker run -d \
  --name frontend \
  --network fullstack-net \
  -p 3000:80 \
  -e API_URL=http://backend:8080 \
  your-frontend:latest
```

#### 项目三：开发环境（代码热更新）

```bash
# 使用 Bind Mount 实现代码热更新
docker run -d \
  --name dev-server \
  -p 3000:3000 \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/package.json:/app/package.json \
  node:18-alpine \
  sh -c "npm install && npm run dev"
```

## 网络排查技巧

```bash
# 查看容器网络配置
docker inspect --format='{{.NetworkSettings.IPAddress}}' container-name

# 测试容器连通性
docker exec container1 ping container2

# 查看容器端口映射
docker port container-name

# 进入容器网络命名空间
docker exec -it container-name sh
```

## 存储空间管理

```bash
# 查看 Docker 磁盘使用情况
docker system df

# 清理未使用的资源
docker system prune -a --volumes

# 查看数据卷占用空间
docker volume ls -q | xargs docker volume inspect | grep Mountpoint
```

## 常见问题

### 网络相关
1. **容器间无法通信？**
   - 检查是否在同一网络
   - 使用自定义网络而非默认 bridge
   - 检查防火墙规则

2. **端口映射不生效？**
   - 检查端口是否已被占用
   - 确认容器内服务是否监听正确端口
   - 检查防火墙设置

### 存储相关
1. **数据丢失？**
   - 使用 Volume 而非容器内部存储
   - 定期备份重要数据
   - 检查挂载路径是否正确

2. **权限问题？**
   - 检查宿主机目录权限
   - 容器内用户 UID 和宿主机匹配
   - 使用 `--user` 参数指定用户

## 学习检验

完成本阶段后，你应该能够：
- [ ] 理解 Docker 的网络模型
- [ ] 创建和管理自定义网络
- [ ] 实现容器间的网络通信
- [ ] 配置端口映射
- [ ] 使用 Volume 实现数据持久化
- [ ] 备份和恢复容器数据
- [ ] 排查网络和存储相关问题

## 下一步
完成本阶段学习后，进入 [第四阶段：Docker Compose](../04-docker-compose/README.md)
