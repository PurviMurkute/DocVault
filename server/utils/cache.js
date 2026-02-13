import { createClient } from 'redis';

import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});
await client.connect();

const PREFIX = process.env.REDIS_PREFIX || 'app';

const withPrefix = (key) => `${PREFIX}:${key}`;

const createCache = async(key, value) => {
    await client.set(withPrefix(key), JSON.stringify(value));
    return true; 
}

const getCache = async(key) => {
    const value = await client.get(withPrefix(key));
    if(value){
        console.log(`Cache hit for key: ${withPrefix(key)}`);
    }
    return value ? JSON.parse(value) : null;
}

const flushCache = async (key) => {
    await client.del(withPrefix(key));
    console.log(`Cache flushed for key: ${withPrefix(key)}`);
};

export { createCache, getCache, flushCache };