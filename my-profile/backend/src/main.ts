import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  await app.listen(3000);
}

export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  // Allow any origin to talk to this API for development
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  
  // This helps handle the OPTIONS request specifically
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  return instance(req, res);
};

bootstrap();