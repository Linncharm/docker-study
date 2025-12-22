# Docker 学习路线图

## 学习目标
系统掌握 Docker 容器技术，提升运维能力，能够在生产环境中熟练使用 Docker 进行应用部署和管理。

---

## 第一阶段：Docker 基础入门（1-2周）

### 1.1 Docker 核心概念
- [ ] Docker 是什么？解决了什么问题？
- [ ] 容器 vs 虚拟机的区别
- [ ] Docker 的核心组件：Docker Engine、Docker CLI、Docker Desktop
- [ ] Docker 架构：Client-Server 模式
- [ ] 镜像（Image）、容器（Container）、仓库（Registry）的概念

### 1.2 Docker 安装与环境配置
- [ ] 在 macOS/Linux/Windows 上安装 Docker
- [ ] Docker Desktop 的使用
- [ ] 配置 Docker 镜像加速器（国内环境）
- [ ] 验证安装：`docker version` 和 `docker info`

### 1.3 Docker 基础命令
- [ ] 镜像操作：`pull`、`images`、`rmi`、`tag`、`search`
- [ ] 容器操作：`run`、`ps`、`stop`、`start`、`restart`、`rm`
- [ ] 容器交互：`exec`、`attach`、`logs`、`inspect`
- [ ] 数据拷贝：`cp`
- [ ] 资源查看：`stats`、`top`

### 1.4 第一个实践项目
- [ ] 运行一个 Nginx 容器并访问
- [ ] 运行一个 MySQL 容器并连接
- [ ] 理解端口映射（-p）和数据卷挂载（-v）

---

## 第二阶段：Docker 镜像深入（2-3周）

### 2.1 Docker 镜像原理
- [ ] 镜像的分层结构（UnionFS）
- [ ] 镜像存储驱动：overlay2、aufs 等
- [ ] 镜像的只读层和容器的可写层
- [ ] 镜像的缓存机制

### 2.2 Dockerfile 编写
- [ ] Dockerfile 基础指令：FROM、RUN、COPY、ADD、CMD、ENTRYPOINT
- [ ] 高级指令：ENV、ARG、WORKDIR、EXPOSE、VOLUME
- [ ] 多阶段构建（Multi-stage Build）
- [ ] 最佳实践：减小镜像体积、优化构建缓存、安全性考虑

### 2.3 镜像构建与优化
- [ ] `docker build` 命令详解
- [ ] `.dockerignore` 文件的使用
- [ ] 镜像体积优化技巧
- [ ] 镜像安全扫描工具：Trivy、Clair

### 2.4 私有镜像仓库
- [ ] Docker Hub 的使用
- [ ] 搭建私有 Registry
- [ ] Harbor 镜像仓库的安装和使用
- [ ] 镜像的 push 和 pull 操作

### 2.5 实践项目
- [ ] 为一个 Node.js/Python/Java 应用编写 Dockerfile
- [ ] 实现多阶段构建优化镜像
- [ ] 搭建私有 Registry 并推送镜像

---

## 第三阶段：Docker 网络与存储（2周）

### 3.1 Docker 网络
- [ ] Docker 网络模式：bridge、host、none、container
- [ ] 自定义桥接网络
- [ ] 容器间通信机制
- [ ] 容器与宿主机网络通信
- [ ] 网络命令：`docker network create/ls/inspect/rm`

### 3.2 Docker 存储
- [ ] 数据卷（Volume）vs 绑定挂载（Bind Mount）vs tmpfs
- [ ] Volume 的创建和管理
- [ ] 数据持久化最佳实践
- [ ] 存储驱动和性能考虑
- [ ] 备份和恢复容器数据

### 3.3 实践项目
- [ ] 创建自定义网络并实现容器通信
- [ ] 搭建 WordPress + MySQL（使用 Volume 持久化数据）
- [ ] 实现容器数据的备份和恢复

---

## 第四阶段：Docker Compose（2周）

### 4.1 Docker Compose 基础
- [ ] Docker Compose 是什么？解决了什么问题？
- [ ] docker-compose.yml 文件结构
- [ ] 核心配置：services、networks、volumes
- [ ] version 版本说明

### 4.2 Compose 文件编写
- [ ] 服务定义：image、build、ports、volumes、environment
- [ ] 依赖管理：depends_on、healthcheck
- [ ] 资源限制：CPU、内存限制
- [ ] 环境变量和 .env 文件

### 4.3 Compose 命令
- [ ] `docker-compose up/down`
- [ ] `docker-compose ps/logs/exec`
- [ ] `docker-compose build/pull`
- [ ] `docker-compose scale`（v2 使用 `--scale`）

### 4.4 实践项目
- [ ] 使用 Compose 部署 LNMP 架构（Linux + Nginx + MySQL + PHP）
- [ ] 部署微服务应用（前端 + 后端 + 数据库 + Redis）
- [ ] 实现开发环境的一键启动

---

## 第五阶段：Docker 运维实践（2-3周）

### 5.1 容器监控
- [ ] Docker 自带监控：`docker stats`
- [ ] cAdvisor 容器监控
- [ ] Prometheus + Grafana 监控方案
- [ ] 监控指标：CPU、内存、网络、磁盘 I/O

### 5.2 日志管理
- [ ] Docker 日志驱动：json-file、syslog、journald
- [ ] 日志收集：ELK Stack（Elasticsearch + Logstash + Kibana）
- [ ] 日志收集：EFK Stack（Elasticsearch + Fluentd + Kibana）
- [ ] 日志轮转和清理策略

### 5.3 容器安全
- [ ] 镜像安全：基础镜像选择、漏洞扫描
- [ ] 容器运行时安全：--privileged、--cap-add/--cap-drop
- [ ] 资源隔离：cgroups 和 namespaces
- [ ] 用户权限管理：非 root 用户运行
- [ ] Docker Bench for Security 安全检查

### 5.4 性能优化
- [ ] 容器资源限制：--cpus、--memory
- [ ] 镜像优化：减小体积、优化层数
- [ ] 存储性能优化
- [ ] 网络性能优化

### 5.5 实践项目
- [ ] 搭建 Prometheus + Grafana 监控系统
- [ ] 部署 ELK 日志收集系统
- [ ] 进行 Docker 安全加固

---

## 第六阶段：容器编排入门（2-3周）

### 6.1 Docker Swarm
- [ ] Swarm 基础概念：Manager、Worker
- [ ] Swarm 集群搭建
- [ ] Service、Task、Stack 概念
- [ ] 服务发现和负载均衡
- [ ] 滚动更新和回滚

### 6.2 Kubernetes 基础
- [ ] Kubernetes 架构概述
- [ ] 核心概念：Pod、Deployment、Service、ConfigMap、Secret
- [ ] kubectl 基础命令
- [ ] 本地 K8s 环境：Minikube、kind、Docker Desktop K8s

### 6.3 实践项目
- [ ] 使用 Swarm 部署多节点集群
- [ ] 在 Kubernetes 中部署简单应用
- [ ] 实现服务的滚动更新

---

## 第七阶段：CI/CD 集成（2周）

### 7.1 Docker 与 CI/CD
- [ ] CI/CD 基础概念
- [ ] Docker 在 CI/CD 中的作用
- [ ] 镜像构建自动化

### 7.2 常用 CI/CD 工具集成
- [ ] Jenkins + Docker
- [ ] GitLab CI + Docker
- [ ] GitHub Actions + Docker
- [ ] 自动化测试和部署流程

### 7.3 实践项目
- [ ] 搭建 Jenkins + Docker 自动化构建环境
- [ ] 实现代码提交自动构建镜像
- [ ] 实现自动化测试和部署

---

## 第八阶段：高级主题与生产实践（3-4周）

### 8.1 微服务架构
- [ ] 微服务概念和优势
- [ ] 容器化微服务最佳实践
- [ ] 服务网格（Service Mesh）初探：Istio

### 8.2 生产环境部署
- [ ] 高可用架构设计
- [ ] 蓝绿部署、金丝雀发布
- [ ] 容灾和备份策略
- [ ] 问题排查和调试技巧

### 8.3 容器生态工具
- [ ] Portainer（Docker 可视化管理）
- [ ] Rancher（容器管理平台）
- [ ] Traefik（反向代理和负载均衡）
- [ ] Watchtower（自动更新容器）

### 8.4 综合实践项目
- [ ] 部署一个完整的微服务项目
- [ ] 实现生产级别的监控、日志、告警系统
- [ ] 编写运维文档和故障处理手册

---

## 学习建议

### 学习方法
1. **理论与实践结合**：每学习一个概念，立即动手实践
2. **循序渐进**：不要跳过基础阶段，扎实掌握每个知识点
3. **记录笔记**：建立自己的知识库，记录踩过的坑
4. **实际项目**：尝试将 Docker 应用到实际项目中
5. **社区学习**：参与 Docker 社区，阅读官方文档和博客

### 推荐资源
- **官方文档**：https://docs.docker.com/
- **Docker Hub**：https://hub.docker.com/
- **Play with Docker**：https://labs.play-with-docker.com/（在线练习环境）
- **书籍推荐**：
  - 《Docker 技术入门与实战》
  - 《深入浅出 Docker》
  - 《Docker 容器与容器云》

### 时间规划
- **基础阶段**（第1-2阶段）：3-5周，打好基础
- **进阶阶段**（第3-5阶段）：6-8周，深入理解
- **高级阶段**（第6-8阶段）：7-9周，生产实践

**总计**：约 3-5 个月可以系统掌握 Docker，具体时间根据个人基础和投入时间调整。

---

## 检验标准

完成学习后，你应该能够：
- [ ] 独立编写 Dockerfile 并优化镜像
- [ ] 使用 Docker Compose 部署多容器应用
- [ ] 理解并配置 Docker 网络和存储
- [ ] 搭建 Docker 监控和日志系统
- [ ] 处理常见的 Docker 故障和性能问题
- [ ] 在生产环境中安全地部署和管理容器
- [ ] 将 Docker 集成到 CI/CD 流程中
- [ ] 具备基础的容器编排能力（Swarm 或 K8s）

---

**祝学习顺利！坚持实践是掌握 Docker 的关键。**
