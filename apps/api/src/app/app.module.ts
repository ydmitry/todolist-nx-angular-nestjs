import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { DataProviderService } from './data-provider.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DataProviderService],
})
export class AppModule {}
