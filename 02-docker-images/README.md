# 第二阶段：Docker 镜像深入

## 学习目标
- 深入理解 Docker 镜像的原理和分层结构
- 掌握 Dockerfile 的编写和最佳实践
- 能够构建和优化 Docker 镜像
- 了解私有镜像仓库的搭建和使用

## 学习时间
预计 2-3 周

## 学习内容

### 01-image-principles（镜像原理）
深入理解 Docker 镜像的底层实现机制。

**关键知识点：**
- 镜像的分层结构（UnionFS/OverlayFS）
- 镜像存储驱动：overlay2、aufs、devicemapper
- 镜像的只读层和容器的可写层
- 写时复制（Copy-on-Write）机制
- 镜像构建缓存机制

**实践任务：**
- [ ] 使用 `docker history` 查看镜像层
- [ ] 使用 `docker inspect` 查看镜像详细信息
- [ ] 理解镜像 ID 和摘要（digest）
- [ ] 观察镜像构建时的缓存使用

**示例命令：**
```bash
# 查看镜像的层结构
docker history nginx:latest

# 查看镜像详细信息
docker inspect nginx:latest

# 查看镜像的存储位置
docker info | grep "Storage Driver"
```

### 02-dockerfile（Dockerfile 编写）
学习 Dockerfile 的语法和编写规范。

**基础指令：**
- `FROM` - 指定基础镜像
- `RUN` - 执行命令
- `COPY` / `ADD` - 复制文件
- `WORKDIR` - 设置工作目录
- `ENV` - 设置环境变量
- `EXPOSE` - 声明端口
- `CMD` - 容器启动命令
- `ENTRYPOINT` - 入口点

**高级指令：**
- `ARG` - 构建参数
- `VOLUME` - 声明数据卷
- `USER` - 指定用户
- `HEALTHCHECK` - 健康检查
- `ONBUILD` - 触发器指令

**实践任务：**
- [ ] 为简单应用编写 Dockerfile
- [ ] 理解 CMD 和 ENTRYPOINT 的区别
- [ ] 使用 ARG 和 ENV 传递参数
- [ ] 添加健康检查

**示例 Dockerfile：**
```dockerfile
# Node.js 应用示例
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 3000

# 非 root 用户运行
USER node

# 启动命令
CMD ["node", "server.js"]
```

### 03-image-optimization（镜像优化）
学习如何构建小而美的 Docker 镜像。

**优化技巧：**

1. **选择合适的基础镜像**
   - 优先使用 Alpine Linux（体积小）
   - 对比：ubuntu (~70MB) vs alpine (~5MB)

2. **合并 RUN 指令**
   ```dockerfile
   # 不好的做法
   RUN apt-get update
   RUN apt-get install -y git
   RUN apt-get install -y vim

   # 好的做法
   RUN apt-get update && apt-get install -y \
       git \
       vim \
       && rm -rf /var/lib/apt/lists/*
   ```

3. **多阶段构建**
   ```dockerfile
   # 构建阶段
   FROM golang:1.21 AS builder
   WORKDIR /app
   COPY . .
   RUN go build -o myapp

   # 运行阶段
   FROM alpine:latest
   COPY --from=builder /app/myapp /myapp
   CMD ["/myapp"]
   ```

4. **使用 .dockerignore**
   ```
   .git
   node_modules
   *.log
   .env
   ```

5. **清理临时文件和缓存**
   ```dockerfile
   RUN apt-get update && apt-get install -y xxx \
       && apt-get clean \
       && rm -rf /var/lib/apt/lists/*
   ```

**实践任务：**
- [ ] 对比优化前后的镜像大小
- [ ] 实现多阶段构建
- [ ] 使用 .dockerignore 排除文件
- [ ] 使用镜像扫描工具检查漏洞

### 04-registry（私有镜像仓库）
学习镜像仓库的使用和私有仓库的搭建。

**Docker Hub 使用：**
```bash
# 登录 Docker Hub
docker login

# 标记镜像
docker tag myapp:latest username/myapp:v1.0

# 推送镜像
docker push username/myapp:v1.0

# 拉取镜像
docker pull username/myapp:v1.0
```

**搭建私有 Registry：**
```bash
# 运行 Registry
docker run -d \
  -p 5000:5000 \
  --name registry \
  -v registry-data:/var/lib/registry \
  registry:2

# 推送到私有仓库
docker tag myapp localhost:5000/myapp:v1.0
docker push localhost:5000/myapp:v1.0
```

**Harbor 企业级仓库：**
Harbor 是企业级的 Docker 镜像仓库，提供了更丰富的功能：
- 用户权限管理
- 镜像签名和扫描
- 镜像复制（多地域）
- Web UI 管理界面

**实践任务：**
- [ ] 注册 Docker Hub 账号并推送镜像
- [ ] 搭建本地 Registry
- [ ] 了解 Harbor 的功能和使用场景

### 05-practice（综合实践）
通过实际项目巩固所学知识。

**项目一：Node.js Web 应用**
- 编写 Dockerfile
- 实现多阶段构建
- 优化镜像体积
- 推送到私有仓库

**项目二：Python Flask 应用**
- 选择合适的基础镜像
- 处理依赖安装
- 添加健康检查
- 镜像安全扫描

**项目三：Java Spring Boot 应用**
- 使用多阶段构建
- JDK vs JRE 选择
- 优化启动时间
- 制作精简镜像

## 最佳实践总结

### Dockerfile 编写规范
1. 使用官方基础镜像
2. 指定明确的镜像标签（避免使用 latest）
3. 合并 RUN 指令减少层数
4. 利用构建缓存，将变化少的指令放前面
5. 使用多阶段构建
6. 以非 root 用户运行应用
7. 添加 HEALTHCHECK 健康检查
8. 使用 .dockerignore 排除文件

### 镜像安全建议
1. 定期更新基础镜像
2. 使用镜像扫描工具（Trivy、Clair）
3. 不在镜像中包含敏感信息
4. 最小化镜像内容
5. 使用官方或可信的镜像

### 镜像优化检查清单
- [ ] 选择最小的基础镜像
- [ ] 合并 RUN 指令
- [ ] 清理缓存和临时文件
- [ ] 使用多阶段构建
- [ ] 使用 .dockerignore
- [ ] 镜像体积 < 500MB（根据应用而定）

## 工具推荐

### 镜像扫描
```bash
# Trivy - 漏洞扫描
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image myapp:latest
```

### 镜像分析
```bash
# Dive - 分析镜像层
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  wagoodman/dive:latest myapp:latest
```

## 学习检验

完成本阶段后，你应该能够：
- [ ] 理解镜像的分层结构和工作原理
- [ ] 独立编写规范的 Dockerfile
- [ ] 构建和优化 Docker 镜像
- [ ] 使用多阶段构建减小镜像体积
- [ ] 搭建和使用私有镜像仓库
- [ ] 进行镜像安全扫描

## 下一步
完成本阶段学习后，进入 [第三阶段：Docker 网络与存储](../03-network-storage/README.md)
