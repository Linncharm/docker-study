# Docker 命令速查表

## 镜像相关

### 获取和查看镜像
```bash
# 搜索镜像
docker search <image-name>

# 拉取镜像
docker pull <image>:<tag>

# 查看本地镜像列表
docker images
docker image ls

# 查看镜像详细信息
docker inspect <image>

# 查看镜像历史
docker history <image>

# 查看镜像占用空间
docker system df
```

### 构建和管理镜像
```bash
# 构建镜像
docker build -t <image-name>:<tag> .
docker build -t <image-name>:<tag> -f <Dockerfile> .

# 不使用缓存构建
docker build --no-cache -t <image-name> .

# 标记镜像
docker tag <source-image>:<tag> <target-image>:<tag>

# 删除镜像
docker rmi <image>
docker image rm <image>

# 删除所有未使用的镜像
docker image prune -a

# 保存镜像到文件
docker save -o <file.tar> <image>

# 从文件加载镜像
docker load -i <file.tar>
```

### 推送镜像
```bash
# 登录镜像仓库
docker login
docker login <registry-url>

# 推送镜像
docker push <image>:<tag>

# 登出
docker logout
```

## 容器相关

### 运行容器
```bash
# 运行容器（前台）
docker run <image>

# 运行容器（后台）
docker run -d <image>

# 运行容器并命名
docker run -d --name <container-name> <image>

# 运行容器并映射端口
docker run -d -p <host-port>:<container-port> <image>

# 运行容器并挂载数据卷
docker run -d -v <volume-name>:/path <image>
docker run -d -v /host/path:/container/path <image>

# 运行容器并设置环境变量
docker run -d -e KEY=VALUE <image>

# 运行容器后自动删除
docker run --rm <image>

# 交互式运行容器
docker run -it <image> /bin/bash
```

### 管理容器
```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 启动容器
docker start <container>

# 停止容器
docker stop <container>

# 重启容器
docker restart <container>

# 暂停容器
docker pause <container>

# 恢复容器
docker unpause <container>

# 删除容器
docker rm <container>

# 强制删除运行中的容器
docker rm -f <container>

# 删除所有停止的容器
docker container prune
```

### 容器操作
```bash
# 查看容器日志
docker logs <container>

# 实时查看日志
docker logs -f <container>

# 查看最近 N 行日志
docker logs --tail <N> <container>

# 进入运行中的容器
docker exec -it <container> /bin/bash
docker exec -it <container> sh

# 在容器中执行命令
docker exec <container> <command>

# 查看容器进程
docker top <container>

# 查看容器资源使用
docker stats
docker stats <container>

# 查看容器详细信息
docker inspect <container>

# 查看容器端口映射
docker port <container>

# 复制文件到容器
docker cp <local-file> <container>:/path

# 从容器复制文件
docker cp <container>:/path <local-file>

# 导出容器为镜像
docker export <container> > <file.tar>

# 从导出文件创建镜像
docker import <file.tar> <image-name>:<tag>
```

## 网络相关

```bash
# 列出网络
docker network ls

# 查看网络详情
docker network inspect <network>

# 创建网络
docker network create <network-name>

# 创建自定义网络（指定子网）
docker network create --driver bridge --subnet 172.20.0.0/16 <network-name>

# 连接容器到网络
docker network connect <network> <container>

# 断开容器网络
docker network disconnect <network> <container>

# 删除网络
docker network rm <network>

# 清理未使用的网络
docker network prune
```

## 数据卷相关

```bash
# 列出数据卷
docker volume ls

# 查看数据卷详情
docker volume inspect <volume>

# 创建数据卷
docker volume create <volume-name>

# 删除数据卷
docker volume rm <volume>

# 清理未使用的数据卷
docker volume prune
```

## Docker Compose

```bash
# 启动服务（后台）
docker compose up -d

# 启动服务（前台）
docker compose up

# 停止并删除容器
docker compose down

# 停止但不删除容器
docker compose stop

# 启动已停止的容器
docker compose start

# 重启服务
docker compose restart

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs
docker compose logs -f
docker compose logs -f <service>

# 构建服务
docker compose build

# 启动时重新构建
docker compose up -d --build

# 在容器中执行命令
docker compose exec <service> <command>

# 运行一次性命令
docker compose run <service> <command>

# 扩展服务实例
docker compose up -d --scale <service>=<N>

# 验证配置文件
docker compose config

# 查看服务配置
docker compose config --services

# 停止并删除所有资源（包括数据卷）
docker compose down -v

# 停止并删除所有资源（包括镜像）
docker compose down --rmi all
```

## 系统管理

### 信息查看
```bash
# 查看 Docker 版本
docker version

# 查看 Docker 系统信息
docker info

# 查看磁盘使用情况
docker system df

# 查看详细磁盘使用
docker system df -v
```

### 清理
```bash
# 清理所有未使用的资源（容器、网络、镜像、构建缓存）
docker system prune

# 清理所有未使用的资源（包括数据卷）
docker system prune -a --volumes

# 清理未使用的容器
docker container prune

# 清理未使用的镜像
docker image prune

# 清理所有镜像
docker image prune -a

# 清理未使用的网络
docker network prune

# 清理未使用的数据卷
docker volume prune

# 清理构建缓存
docker builder prune
```

## 快捷操作

```bash
# 停止所有容器
docker stop $(docker ps -q)

# 删除所有容器
docker rm $(docker ps -aq)

# 删除所有镜像
docker rmi $(docker images -q)

# 删除所有停止的容器
docker rm $(docker ps -qf status=exited)

# 删除所有悬空镜像（dangling）
docker rmi $(docker images -qf dangling=true)
```

## 常用组合

### 开发环境
```bash
# 运行 Node.js 开发环境
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  -p 3000:3000 \
  node:18-alpine \
  sh

# 运行 Python 开发环境
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  -p 8000:8000 \
  python:3.11-alpine \
  sh
```

### 快速部署
```bash
# 部署 Nginx
docker run -d \
  --name nginx \
  -p 80:80 \
  -v $(pwd)/html:/usr/share/nginx/html \
  nginx:alpine

# 部署 MySQL
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.0

# 部署 Redis
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:alpine

# 部署 PostgreSQL
docker run -d \
  --name postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=root123 \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:15-alpine
```

## Dockerfile 常用指令

```dockerfile
# 基础镜像
FROM <image>:<tag>

# 维护者信息
LABEL maintainer="your-email@example.com"

# 设置工作目录
WORKDIR /app

# 复制文件
COPY <src> <dest>
ADD <src> <dest>

# 执行命令
RUN <command>

# 设置环境变量
ENV KEY=VALUE

# 暴露端口
EXPOSE <port>

# 数据卷
VOLUME /data

# 用户
USER <user>

# 启动命令
CMD ["executable", "param1", "param2"]
ENTRYPOINT ["executable", "param1", "param2"]

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

# 构建参数
ARG BUILD_ENV=production

# 触发器
ONBUILD RUN <command>
```

## 技巧和注意事项

### 镜像相关
- 使用明确的标签，避免使用 `latest`
- 使用多阶段构建减小镜像体积
- 合并 RUN 指令减少镜像层数
- 使用 `.dockerignore` 排除不需要的文件

### 容器相关
- 使用 `--rm` 运行一次性容器
- 使用命名卷而不是绑定挂载（生产环境）
- 容器只运行一个进程
- 使用健康检查确保服务可用

### 网络相关
- 使用自定义网络而不是默认 bridge
- 容器间通过服务名通信
- 只暴露必要的端口

### 安全相关
- 不以 root 用户运行容器
- 使用官方或可信镜像
- 定期更新基础镜像
- 扫描镜像漏洞

### 性能相关
- 限制容器资源（CPU、内存）
- 使用合适的存储驱动
- 定期清理未使用的资源
- 使用镜像缓存加速构建
