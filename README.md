# Docker 系统化学习仓库

欢迎来到 Docker 系统化学习仓库！本仓库旨在帮助你从零开始，系统性地学习 Docker 容器技术，提升运维能力。

## 学习目标

通过本学习路线，你将能够：
- 深入理解 Docker 的核心概念和工作原理
- 熟练使用 Docker 进行应用开发和部署
- 掌握 Docker 网络、存储等高级特性
- 具备生产环境中使用 Docker 的能力
- 了解容器编排和 CI/CD 集成

## 学习路线

### 完整路线图
详细的学习路线请查看：[DOCKER_LEARNING_ROADMAP.md](./DOCKER_LEARNING_ROADMAP.md)

### 学习阶段

#### [第一阶段：Docker 基础入门](./01-docker-basics/README.md)（1-2周）
- Docker 核心概念
- 安装与环境配置
- 基础命令掌握
- 运行第一个容器

**学完你将能够：** 理解 Docker 基本概念，运行和管理简单容器

---

#### [第二阶段：Docker 镜像深入](./02-docker-images/README.md)（2-3周）
- 镜像原理和分层结构
- Dockerfile 编写
- 镜像构建和优化
- 私有镜像仓库

**学完你将能够：** 独立编写 Dockerfile，构建和优化镜像

---

#### [第三阶段：Docker 网络与存储](./03-network-storage/README.md)（2周）
- Docker 网络模型
- 容器间通信
- 数据持久化
- 备份和恢复

**学完你将能够：** 配置容器网络，实现数据持久化

---

#### [第四阶段：Docker Compose](./04-docker-compose/README.md)（2周）
- Compose 基础概念
- docker-compose.yml 编写
- 多容器应用管理
- 服务编排

**学完你将能够：** 使用 Compose 管理多容器应用

---

#### [第五阶段：Docker 运维实践](./05-operations/README.md)（2-3周）
- 容器监控
- 日志管理
- 安全加固
- 性能优化

**学完你将能够：** 在生产环境中运维 Docker

---

#### [第六阶段：容器编排入门](./06-orchestration/README.md)（2-3周）
- Docker Swarm
- Kubernetes 基础
- 服务发现和负载均衡

**学完你将能够：** 理解容器编排，使用 K8s 部署应用

---

#### [第七阶段：CI/CD 集成](./07-cicd/README.md)（2周）
- CI/CD 基础
- Jenkins + Docker
- GitLab CI / GitHub Actions
- 自动化构建部署

**学完你将能够：** 将 Docker 集成到 CI/CD 流程

---

#### [第八阶段：高级主题与生产实践](./08-advanced/README.md)（3-4周）
- 微服务架构
- 生产环境部署
- 容器生态工具
- 综合实战项目

**学完你将能够：** 在生产环境中运用 Docker 最佳实践

---

## 目录结构

```
study/
├── README.md                          # 本文件
├── DOCKER_LEARNING_ROADMAP.md         # 详细学习路线图
├── 01-docker-basics/                  # 第一阶段：基础入门
│   ├── README.md
│   ├── 01-concepts/
│   ├── 02-installation/
│   ├── 03-basic-commands/
│   └── 04-first-project/
├── 02-docker-images/                  # 第二阶段：镜像深入
│   ├── README.md
│   ├── 01-image-principles/
│   ├── 02-dockerfile/
│   ├── 03-image-optimization/
│   ├── 04-registry/
│   └── 05-practice/
├── 03-network-storage/                # 第三阶段：网络与存储
│   ├── README.md
│   ├── 01-network/
│   ├── 02-storage/
│   └── 03-practice/
├── 04-docker-compose/                 # 第四阶段：Compose
│   ├── README.md
│   ├── 01-basics/
│   ├── 02-compose-file/
│   ├── 03-commands/
│   └── 04-practice/
├── 05-operations/                     # 第五阶段：运维实践
│   ├── README.md
│   ├── 01-monitoring/
│   ├── 02-logging/
│   ├── 03-security/
│   ├── 04-optimization/
│   └── 05-practice/
├── 06-orchestration/                  # 第六阶段：容器编排
│   ├── README.md
│   ├── 01-swarm/
│   ├── 02-kubernetes/
│   └── 03-practice/
├── 07-cicd/                           # 第七阶段：CI/CD
│   ├── README.md
│   ├── 01-basics/
│   ├── 02-tools/
│   └── 03-practice/
├── 08-advanced/                       # 第八阶段：高级主题
│   ├── README.md
│   ├── 01-microservices/
│   ├── 02-production/
│   ├── 03-tools/
│   └── 04-project/
├── resources/                         # 学习资源
│   ├── cheatsheets/                   # 速查表
│   ├── scripts/                       # 实用脚本
│   └── templates/                     # 模板文件
└── notes/                             # 个人学习笔记
```

## 如何使用本仓库

### 1. 循序渐进学习
- 按照阶段顺序学习，不要跳过基础部分
- 每个阶段都有对应的 README 指导文档
- 完成每个阶段的实践任务

### 2. 动手实践
- 每学习一个知识点，立即动手操作
- 完成每个阶段的实践项目
- 将代码和配置保存到对应目录

### 3. 记录笔记
- 在 `notes/` 目录记录学习心得
- 记录遇到的问题和解决方案
- 建立自己的知识库

### 4. 使用资源
- `resources/cheatsheets/` - 常用命令速查表
- `resources/scripts/` - 实用脚本和工具
- `resources/templates/` - Dockerfile 和 Compose 模板

## 学习建议

### 时间规划
- **基础阶段**（1-2）：3-5 周
- **进阶阶段**（3-5）：6-8 周
- **高级阶段**（6-8）：7-9 周
- **总计**：约 3-5 个月（根据个人基础调整）

### 学习方法
1. **理论与实践结合** - 学完立即实践
2. **循序渐进** - 打好基础再进阶
3. **记录总结** - 定期回顾和总结
4. **解决问题** - 遇到问题主动查阅文档
5. **实际应用** - 应用到实际项目中

### 推荐资源

**官方文档：**
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)

**在线实践：**
- [Play with Docker](https://labs.play-with-docker.com/) - 在线 Docker 环境
- [Katacoda Docker 课程](https://www.katacoda.com/courses/docker)

**书籍推荐：**
- 《Docker 技术入门与实战》
- 《深入浅出 Docker》
- 《Docker 容器与容器云》

**社区：**
- Docker 官方论坛
- Stack Overflow
- GitHub Docker 项目

## 学习检查清单

### 基础能力
- [ ] 理解容器和镜像的概念
- [ ] 熟练使用 Docker 命令行
- [ ] 能够编写 Dockerfile
- [ ] 掌握 Docker Compose 使用

### 进阶能力
- [ ] 理解 Docker 网络原理
- [ ] 实现数据持久化
- [ ] 进行镜像优化
- [ ] 配置容器监控和日志

### 高级能力
- [ ] 了解容器编排（Swarm/K8s）
- [ ] 集成 CI/CD 流程
- [ ] 生产环境部署经验
- [ ] 处理常见故障

## 实践项目建议

在学习过程中，建议完成以下实践项目：

### 初级项目
1. 使用 Docker 部署 Nginx 静态网站
2. 容器化一个简单的 Web 应用
3. 使用 Compose 部署 WordPress

### 中级项目
1. 构建多层应用（前端 + 后端 + 数据库）
2. 实现开发环境的容器化
3. 搭建私有镜像仓库

### 高级项目
1. 部署微服务架构应用
2. 搭建监控和日志系统
3. 实现完整的 CI/CD 流程

## 常见问题

### 学习相关
**Q: 需要什么基础？**
A: 基本的 Linux 命令行操作即可，会简单编程更佳。

**Q: 学习周期多久？**
A: 根据投入时间，约 3-5 个月可以系统掌握。

**Q: 如何验证学习效果？**
A: 完成各阶段的实践项目，能在实际工作中应用。

### 技术相关
**Q: Docker 和虚拟机有什么区别？**
A: 见第一阶段学习内容。

**Q: 生产环境如何使用 Docker？**
A: 见第五阶段和第八阶段内容。

**Q: 是否需要学习 Kubernetes？**
A: 掌握 Docker 后，建议学习 K8s 进行容器编排。

## 贡献

欢迎贡献你的学习心得和实践经验！

- 提交问题：发现错误或有疑问，请提 Issue
- 分享经验：在 notes 目录分享学习笔记
- 完善内容：发现可改进的地方，欢迎 PR

## 版权说明

本仓库内容仅供学习使用。

## 联系方式

如有问题或建议，欢迎通过 Issue 交流讨论。

---

**开始你的 Docker 学习之旅吧！** 🚀

记住：**实践是最好的老师，坚持是成功的关键！**
