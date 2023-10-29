import { Module } from '@nestjs/common';

import { ProApplicationsController } from './controllers/pro-applications.controller';

import { SendProApplication } from 'src/application/use-cases/send-pro-application';

@Module({
  imports: [],
  controllers: [ProApplicationsController],
  providers: [SendProApplication],
})
export class HttpModule {}
