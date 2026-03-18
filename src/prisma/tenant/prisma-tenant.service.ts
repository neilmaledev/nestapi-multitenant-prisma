import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from 'generated/tenant';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaTenantDto } from './dto';

@Injectable()
export class PrismaTenantService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private params: PrismaTenantDto) {

    const adapter = new PrismaMariaDb({
      host: params.dbHost,
      user: params.dbUsername,
      password: params.dbPassword,
      database: params.dbName,
      port: Number(params.dbPort),
      connectionLimit: 5,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma (MariaDB) connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma disconnected');
  }
}