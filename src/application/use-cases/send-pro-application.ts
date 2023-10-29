import { Injectable } from '@nestjs/common';
import {
  ProApplication,
  EducationLevel,
} from '../../domain/entitites/pro-application.entity';
import { ProApplicationResult } from '../../domain/entitites/pro-application-result.entity';

interface SendProApplicationRequest {
  age: number;
  education_level: EducationLevel;
  past_experiences: PastExperiencesRequest;
  internet_test: InternetTestRequest;
  writing_score: number;
  referral_code?: string;
}

interface PastExperiencesRequest {
  sales: boolean;
  support: boolean;
}

interface InternetTestRequest {
  download_speed: number;
  upload_speed: number;
}

interface SendProApplicationResponse {
  proApplicationResult: ProApplicationResult;
}

@Injectable()
export class SendProApplication {
  execute(request: SendProApplicationRequest): SendProApplicationResponse {
    const proApplication = new ProApplication(request);

    const eligibilityScore = proApplication.calculateScore();

    const proApplicationResult = new ProApplicationResult({
      score: eligibilityScore,
      selected_project: '',
      eligible_projects: [],
      ineligible_projects: [],
    });
    return { proApplicationResult };
  }
}
