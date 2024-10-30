import { Controller, Get, UseGuards } from '@nestjs/common';
import { TweetReadService } from '../services/tweet-read.service';
import { Tweet } from '../entities/tweet.entity';
import { EventPattern } from '@nestjs/microservices';
import { GatewayGuard } from '../guards/gateway.guard';

@Controller('tweets')
@UseGuards(GatewayGuard)
export class TweetReadController {
  constructor(private readonly tweetReadService: TweetReadService) {}

  @Get()
  findAll(): Promise<Tweet[]> {
    return this.tweetReadService.findAll();
  }

  @Get('/recent')
  findRecent(): Promise<Tweet[]> {
    return this.tweetReadService.findRecentTweets();
  }

  @EventPattern('tweet_created')
  @UseGuards(GatewayGuard)
  async handleTweetCreated(data: any) {
    await this.tweetReadService.create(data);
  }
}
