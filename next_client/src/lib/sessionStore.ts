import redis from "./redisClient"

export function createSession(userId : string, accessToken: string) {
    const sessionId = crypto.randomUUID();
    redis?.set(`sessionId-${sessionId}`, JSON.stringify({ userId, accessToken }));
    return sessionId;
}

export function setSession(key : string, value: any) {
    redis?.set(`sessionId-${key}`, JSON.stringify(value));
}

export async function getSession(key: string) {
    const data = await redis?.get(`sessionId-${key}`);
    return data ? JSON.parse(data) : null;
}

export async function clearSession(key: string) {
    await redis?.del(`sessionId-${key}`);
}
