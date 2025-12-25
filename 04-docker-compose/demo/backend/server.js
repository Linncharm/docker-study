const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const redis = require('redis');
const amqp = require('amqplib');

const app = express();
const PORT = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(express.json());

// PostgreSQL 连接池
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Redis 客户端
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD,
});

// RabbitMQ 连接
let rabbitChannel = null;
const QUEUE_NAME = 'demo_queue';

// 初始化函数
async function initialize() {
  try {
    // 连接 Redis
    await redisClient.connect();
    console.log('✅ Redis connected');

    // 连接 RabbitMQ
    const rabbitConnection = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST,
      port: process.env.RABBITMQ_PORT,
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
    });
    rabbitChannel = await rabbitConnection.createChannel();
    await rabbitChannel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('✅ RabbitMQ connected');

    // 测试 PostgreSQL 连接
    const result = await pool.query('SELECT NOW()');
    console.log('✅ PostgreSQL connected:', result.rows[0].now);
  } catch (error) {
    console.error('❌ Initialization error:', error);
    process.exit(1);
  }
}

// 路由
// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      postgres: 'connected',
      redis: 'connected',
      rabbitmq: 'connected',
    },
  });
});

// 获取所有用户（从数据库）
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// 创建用户
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    // 发送消息到 RabbitMQ
    const message = {
      action: 'user_created',
      user: result.rows[0],
      timestamp: new Date().toISOString(),
    };
    rabbitChannel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Redis 缓存测试
app.get('/api/cache/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = await redisClient.get(key);
    res.json({ key, value });
  } catch (error) {
    console.error('Redis get error:', error);
    res.status(500).json({ error: 'Cache error' });
  }
});

app.post('/api/cache', async (req, res) => {
  try {
    const { key, value, ttl = 3600 } = req.body;
    await redisClient.setEx(key, ttl, value);
    res.json({ success: true, key, value });
  } catch (error) {
    console.error('Redis set error:', error);
    res.status(500).json({ error: 'Cache error' });
  }
});

// RabbitMQ 消息测试
app.post('/api/message', async (req, res) => {
  try {
    const { message } = req.body;
    const payload = {
      message,
      timestamp: new Date().toISOString(),
    };
    rabbitChannel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)));
    res.json({ success: true, message: 'Message sent to queue' });
  } catch (error) {
    console.error('RabbitMQ send error:', error);
    res.status(500).json({ error: 'Queue error' });
  }
});

// 消费 RabbitMQ 消息（示例）
app.get('/api/messages/consume', async (req, res) => {
  try {
    const msg = await rabbitChannel.get(QUEUE_NAME);
    if (msg) {
      const content = JSON.parse(msg.content.toString());
      rabbitChannel.ack(msg);
      res.json({ success: true, message: content });
    } else {
      res.json({ success: true, message: null });
    }
  } catch (error) {
    console.error('RabbitMQ consume error:', error);
    res.status(500).json({ error: 'Queue error' });
  }
});

// 统计接口
app.get('/api/stats', async (req, res) => {
  try {
    const userCountResult = await pool.query('SELECT COUNT(*) as count FROM users');
    const queueInfo = await rabbitChannel.assertQueue(QUEUE_NAME, { durable: true });

    res.json({
      users: parseInt(userCountResult.rows[0].count),
      queueMessages: queueInfo.messageCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

// 启动服务器
initialize().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

// 优雅关闭
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing connections...');
  await redisClient.quit();
  await pool.end();
  process.exit(0);
});
