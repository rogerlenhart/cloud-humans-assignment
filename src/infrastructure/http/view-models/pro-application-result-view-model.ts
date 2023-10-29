import { ProApplicationResult } from '../../../domain/entitites/pro-application-result.entity';
export class ProApplicationResultViewModel {
  static toHTTP(proApplicationResult: ProApplicationResult) {
    return {
      score: proApplicationResult.score,
      selected_project: proApplicationResult.selected_project,
      eligible_projects: proApplicationResult.eligible_projects,
      ineligible_projects: proApplicationResult.ineligible_projects,
    };
  }
}
