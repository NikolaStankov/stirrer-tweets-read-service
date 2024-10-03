import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tweet } from './tweets/entities/tweet.entity';
import { TweetsModule } from './tweets/tweets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('READ_TW_DB_HOST'),
        port: +configService.get('READ_TW_DB_PORT'),
        username: configService.get('READ_TW_DB_USERNAME'),
        password: configService.get('READ_TW_DB_PASSWORD'),
        database: configService.get('READ_TW_DB_NAME'),
        entities: [Tweet],
        synchronize: true, //Set to false in production
      }),
      inject: [ConfigService],
    }),
    TweetsModule,
  ],
})
export class AppModule {}
