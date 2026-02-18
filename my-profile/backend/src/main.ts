import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // This allows your Vercel frontend to talk to your Vercel backend
  app.enableCors(); 
  await app.listen(3000);
}
// Export for Vercel Serverless
export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};
