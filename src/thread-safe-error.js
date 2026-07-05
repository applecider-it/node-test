import { randomUUID } from 'node:crypto';

let currentRequest = null;

async function db() {
  await new Promise(r => setTimeout(r, Math.random() * 500));

  console.log("DB  ", currentRequest);
}

async function mail() {
  await new Promise(r => setTimeout(r, Math.random() * 500));

  console.log("MAIL", currentRequest);
}

async function handleRequest(user) {
  currentRequest = {
    requestId: randomUUID(),
    user
  };

  await db();
  await mail();
}

handleRequest("Alice");
handleRequest("Bob");
handleRequest("Charlie");