# 第一阶段：Docker 基础入门

## 学习目标
- 理解 Docker 的核心概念和架构
- 掌握 Docker 的安装和基础配置
- 熟练使用 Docker 基础命令
- 能够运行和管理简单的容器

## 学习时间
预计 1-2 周

## 学习内容

### 01-concepts（核心概念）
学习 Docker 的基本概念、容器与虚拟机的区别、Docker 架构等理论知识。

**关键知识点：**
- Docker 是什么？解决了什么问题？
- 容器 vs 虚拟机
- 镜像、容器、仓库的关系
- Docker Client-Server 架构

**实践任务：**
- [ ] 绘制 Docker 架构图
- [ ] 用自己的话解释容器和虚拟机的区别
- [ ] 理解镜像分层的概念

### 02-installation（安装配置）
在你的操作系统上安装 Docker，并进行必要的配置。

**实践任务：**
- [ ] 安装 Docker Desktop / Docker Engine
- [ ] 配置国内镜像加速器
- [ ] 运行 `docker version` 验证安装
- [ ] 运行 `docker run hello-world` 测试

**常用镜像加速器：**
```bash
# 阿里云（需要注册获取专属地址）
# https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors

# Docker 中国官方镜像
# https://registry.docker-cn.com

# 网易云
# http://hub-mirror.c.163.com
```

### 03-basic-commands（基础命令）
掌握 Docker 最常用的命令，能够管理镜像和容器。

**镜像相关命令：**
```bash
docker pull nginx:latest        # 拉取镜像
docker images                   # 查看本地镜像
docker rmi nginx:latest         # 删除镜像
docker tag nginx mynginx        # 镜像打标签
docker search redis             # 搜索镜像
```

**容器相关命令：**
```bash
docker run -d -p 80:80 --name web nginx   # 运行容器
docker ps                                  # 查看运行中的容器
docker ps -a                               # 查看所有容器
docker stop web                            # 停止容器
docker start web                           # 启动容器
docker restart web                         # 重启容器
docker rm web                              # 删除容器
docker logs web                            # 查看容器日志
docker exec -it web bash                   # 进入容器
docker inspect web                         # 查看容器详情
docker stats                               # 查看容器资源使用
```

**实践任务：**
- [ ] 拉取并运行 Nginx 镜像
- [ ] 查看容器日志
- [ ] 进入容器内部执行命令
- [ ] 停止、启动、删除容器
- [ ] 清理无用的镜像和容器

### 04-first-project（第一个项目）
通过实际项目加深对 Docker 的理解。

**项目一：运行 Nginx 服务**
```bash
# 运行 Nginx 容器，映射端口
docker run -d -p 8080:80 --name my-nginx nginx

# 访问 http://localhost:8080 查看效果

# 自定义首页
echo "<h1>Hello Docker!</h1>" > index.html
docker run -d -p 8080:80 -v $(pwd)/index.html:/usr/share/nginx/html/index.html --name custom-nginx nginx
```

**项目二：运行 MySQL 数据库**
```bash
# 运行 MySQL 容器
docker run -d \
  --name mysql-db \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root123 \
  -v mysql-data:/var/lib/mysql \
  mysql:8.0

# 连接 MySQL
docker exec -it mysql-db mysql -uroot -proot123
```

**项目三：运行 Redis**
```bash
# 运行 Redis 容器
docker run -d \
  --name redis-cache \
  -p 6379:6379 \
  redis:latest

# 连接 Redis
docker exec -it redis-cache redis-cli
```

**实践任务：**
- [ ] 部署 Nginx 并自定义首页
- [ ] 部署 MySQL 并创建数据库
- [ ] 部署 Redis 并测试读写
- [ ] 理解端口映射（-p）的作用
- [ ] 理解数据卷挂载（-v）的作用

## 常见问题

### 1. Docker 启动失败？
- 检查系统是否满足要求
- 检查虚拟化是否开启（Windows/Mac）
- 查看 Docker 日志排查问题

### 2. 容器无法访问？
- 检查端口映射是否正确
- 检查防火墙设置
- 使用 `docker logs` 查看容器日志

### 3. 镜像拉取很慢？
- 配置国内镜像加速器
- 检查网络连接

## 学习检验

完成本阶段后，你应该能够：
- [ ] 解释 Docker 的核心概念
- [ ] 独立安装和配置 Docker 环境
- [ ] 熟练使用基础命令管理容器
- [ ] 运行常见的应用容器（Nginx、MySQL、Redis）
- [ ] 理解端口映射和数据卷的概念

## 下一步
完成本阶段学习后，进入 [第二阶段：Docker 镜像深入](../02-docker-images/README.md)
