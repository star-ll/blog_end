import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { connect as connectDB } from './config/db.config';
import { Logger } from './utils';
import { HttpExceptionsFilter } from './utils/error.filter';

import { validRequest } from './utils/vaildate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: ['Authorization', 'content-type'],
      methods: ['post', 'get', 'patch', 'delete'],
    },
    logger: new Logger(),
  });
  app.useGlobalPipes(new validRequest());
  app.useGlobalFilters(new HttpExceptionsFilter());
  const documentOptions = new DocumentBuilder()
    .addBearerAuth({
      type: 'http',
      description: 'JWT权限验证',
    })
    .setTitle('my_blog')
    .setDescription('API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup('api/document', app, document);

  connectDB();

  const port = 3002;
  await app.listen(port);
  console.log(`the port is ${port}`);
}
bootstrap();
