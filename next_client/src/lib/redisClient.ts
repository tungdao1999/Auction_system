import 'server-only';
import Redis from 'ioredis';

console.log("redis url", process.env.REDIS_URL);

let redis: Redis | null = null;
if (process.env.REDIS_URL) {
  redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });
  redis.on('error', (err) => {
	console.error('Redis connection error:', err);
  });
} else {
  console.warn('REDIS_URL environment variable is not set. Redis client not initialized.');
}

export default redis;