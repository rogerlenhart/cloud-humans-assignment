import { Controller, Post, Body } from '@nestjs/common';
import { SendProApplicationDto } from '../dtos/send-pro-application-body';
import { SendProApplication } from 'src/application/use-cases/send-pro-application';
import { ProApplicationResultViewModel } from '../view-models/pro-application-result-view-model';

@Controller('pro-applications')
export class ProApplicationsController {
  constructor(private sendProApplication: SendProApplication) {}

  @Post()
  async send(@Body() body: SendProApplicationDto) {
    const { proApplicationResult } =
      await this.sendProApplication.execute(body);

    return ProApplicationResultViewModel.toHTTP(proApplicationResult);
  }
}
