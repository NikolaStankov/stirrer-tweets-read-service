import { Injectable } from '@nestjs/common';
import { Tweet } from 'src/tweets/entities/tweet.entity';
import { TweetReadRepository } from 'src/tweets/repositories/tweet-read.repository';

@Injectable()
export class TweetReadService {
  constructor(private tweetReadRepository: TweetReadRepository) {}

  async create(tweet: Tweet): Promise<Tweet> {
    return this.tweetReadRepository.save(tweet);
  }

  async findAll(): Promise<Tweet[]> {
    return await this.tweetReadRepository.findAll();
  }

  async findRecentTweets(): Promise<Tweet[]> {
    return await this.tweetReadRepository.findRecentTweets();
  }
}
