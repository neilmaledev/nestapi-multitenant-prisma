import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { EndpointModule } from './endpoint/endpoint.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [CoreModule, PrismaModule, EndpointModule],
})
export class AppModule {}
