import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { join } from 'path';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { Company } from './company/entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: +configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // entities: [Category, Product, Company],
        migrations: ['migrations/*.ts'],
        // logger:true,
        // synchronize: configService.get('DB_SYNCHRONIZE', 'false') === 'true',
        charset: 'utf8mb4',
        timezone: '+00:00',
        // Enable connection pooling for better performance
        extra: {
          connectionLimit: 10,
        },
        debug:true,
        // logger:true
      }),
      
      inject: [ConfigService],
    }),
    CompanyModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
