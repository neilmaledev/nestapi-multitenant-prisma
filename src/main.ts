import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './core/prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // this will omit non-declared elements in dto
  }));

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, () => {
    console.log(`NESTAPI Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}
bootstrap();
