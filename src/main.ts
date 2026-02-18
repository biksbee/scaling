import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createClient } from 'redis';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 30110;
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const pubClient = createClient({ url: 'redis://redis:6379' });
  const subClient = pubClient.duplicate();
  await Promise.all([pubClient.connect(), subClient.connect()]);

  const ioAdapter = new IoAdapter(app);
  ioAdapter.createIOServer = (port, options) => {
    const server = require('socket.io')(port, options);
    server.adapter(createAdapter(pubClient, subClient));
    return server;
  }
  app.useWebSocketAdapter(ioAdapter);

  await app.listen(parseInt('30100', 10), () => {
    console.log(`Listen port ${PORT}`)
  });
}
bootstrap();
