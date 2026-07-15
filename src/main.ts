import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config = new DocumentBuilder()
    .setTitle('Auth Service')
    .setDescription('API document')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // Kiểm tra nếu chạy bằng lệnh Nest CLI thông thường (Production)
  if (!process.env.VITE) {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }
  return app;
}
export const authService = bootstrap();
