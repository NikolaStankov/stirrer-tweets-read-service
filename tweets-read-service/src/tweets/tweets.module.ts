import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetReadController } from './controllers/tweet-read.controller';
import { TweetReadService } from './services/tweet-read.service';
import { TweetReadRepository } from './repositories/tweet-read.repository';
import { Tweet } from './entities/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  controllers: [TweetReadController],
  providers: [TweetReadService, TweetReadRepository],
})
export class TweetsModule {}
