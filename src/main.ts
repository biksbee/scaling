import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './app/adapters/redis-io-adapter';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || '30110';
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  const config = new DocumentBuilder()
    .setTitle('Scaling')
    .setDescription('Scaling Dashboard documentation')
    .setVersion('1.0')
    // .addBearerAuth({
    //   type: 'http',
    //   scheme: 'Bearer',
    // })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(parseInt(PORT, 10), '0.0.0.0', () => {
    console.log(`Swagger docs: http://localhost:${PORT}/api/docs`);
    console.log(`Listen port ${PORT}`);
  });

}
bootstrap();
