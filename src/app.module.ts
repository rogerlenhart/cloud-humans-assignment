import { Module } from '@nestjs/common';

import { HttpModule } from './infrastructure/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
