import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validación de datos de entrada
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  // swagger
  const config = new DocumentBuilder()
  .setTitle('Todos example')
  .setDescription('The todos API description')
  .setVersion('1.0')
  .addServer('http://localhost:3000', 'localhost')
  .addTag('todos')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  // await SwaggerModule.loadPluginMetadata(metadata);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json'
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
