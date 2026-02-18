import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Enable CORS so your frontend domain can talk to this API
  app.enableCors({
    origin: '*', // Allows all origins (perfect for school projects)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. Standard listen for local development
  await app.listen(3000);
}

// 3. Special export for Vercel Serverless Functions
export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};

bootstrap();