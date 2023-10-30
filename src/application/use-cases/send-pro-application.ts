import { Injectable } from '@nestjs/common';
import {
  ProApplication,
  EducationLevel,
} from '../../domain/entitites/pro-application.entity';
import { ProApplicationResult } from '../../domain/entitites/pro-application-result.entity';
import { ProjectsRepository } from '../repositories/projects-repository';

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
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute(
    request: SendProApplicationRequest,
  ): Promise<SendProApplicationResponse> {
    const proApplication = new ProApplication(request);

    const eligibilityScore = proApplication.calculateScore();

    const projects = await this.projectsRepository.getAll();

    const proApplicationResult = new ProApplicationResult(eligibilityScore);
    proApplicationResult.calculateEligibility(projects);
    proApplicationResult.selectProject();

    return { proApplicationResult };
  }
}
