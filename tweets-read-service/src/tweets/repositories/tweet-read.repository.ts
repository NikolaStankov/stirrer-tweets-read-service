import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tweet } from '../entities/tweet.entity';

@Injectable()
export class TweetReadRepository extends Repository<Tweet> {
  constructor(private dataSource: DataSource) {
    super(Tweet, dataSource.createEntityManager());
  }

  async findAll(): Promise<Tweet[]> {
    return await this.find();
  }

  async findRecentTweets(): Promise<Tweet[]> {
    return this.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  }
}
