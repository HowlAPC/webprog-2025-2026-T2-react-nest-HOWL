import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Essential for the frontend to connect
  await app.listen(process.env.PORT || 3000);
}

// Ensure this matches exactly for Vercel Serverless deployment
export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};

bootstrap();