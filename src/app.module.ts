import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { LoggerModule } from './shared/logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: 'tuj',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: ['migrations/*.ts'],
        logging: false,
        charset: 'utf8mb4',
        timezone: '+00:00',
        debug: true,
      }),

      inject: [ConfigService],
    }),
    CompanyModule,
    ProductModule,
    CategoryModule,
    SubCategoryModule,
    LoggerModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,

      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST', 'localhost'),
        port: +configService.get('REDIS_PORT', 6379),
        ttl: +configService.get('CACHE_TTL', 600*100),
      }),
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
