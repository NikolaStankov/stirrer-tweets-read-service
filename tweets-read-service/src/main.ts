import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors();

  const retryDelay = 5000; // 5 seconds
  const maxRetries = 5;

  for (let i = 0; i < maxRetries; i++) {
    try {
      app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBITMQ_URL')],
          queue: 'tweets_queue',
          queueOptions: {
            durable: false,
          },
        },
      });

      await app.startAllMicroservices();
      await app.listen(3002);
      console.log('Application started successfully');
      return;
    } catch (error) {
      console.error(`Failed to start application (attempt ${i + 1}/${maxRetries}):`, error.message);
      if (i < maxRetries - 1) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  console.error('Failed to start application after multiple attempts');
  process.exit(1);
}

bootstrap();