import Redis from 'ioredis'

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    passsword: process.env.REDIS.PASSWORD
});

redisClient.on('connect', ()=>{
    console.log('Redis Connected');
})

export default redisClient