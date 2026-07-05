import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

const storage = new AsyncLocalStorage();

async function db() {
  await new Promise(r => setTimeout(r, Math.random() * 500));
  console.log("DB", storage.getStore());
}

async function mail() {
  await new Promise(r => setTimeout(r, Math.random() * 500));
  console.log("MAIL", storage.getStore());
}

function handleRequest(user) {
  storage.run(
    {
      requestId: randomUUID(),
      user
    },
    async () => {
      await db();
      await mail();
    }
  );
}

handleRequest("Alice");
handleRequest("Bob");
handleRequest("Charlie");