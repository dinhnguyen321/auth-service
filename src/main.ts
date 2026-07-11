import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Kiểm tra nếu chạy bằng lệnh Nest CLI thông thường (Production)
  if (!process.env.VITE) {
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  }
  return app;
}
export const authService = bootstrap();
