import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { EndpointModule } from './endpoint/endpoint.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),
    CoreModule, 
    PrismaModule,
    EndpointModule
],
})
export class AppModule {}
