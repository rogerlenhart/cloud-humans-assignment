import { InMemoryProjectsRepository } from '~/test/repositories/InMemoryProjectsRepository';
import { ProApplicationsController } from './pro-applications.controller';
import { SendProApplication } from '~/application/use-cases/send-pro-application';
import { SendProApplicationDto } from '../dtos/send-pro-application-body';
import { EducationLevel } from 'src/domain/entitites/pro-application.entity';
import { makeProApplicationResult } from '~/test/factories/pro-application-result';
import { makeProject } from '~/test/factories/project';

describe('ProApplicationsController', () => {
  describe('send', () => {
    it('should return pro application result', async () => {
      const repository = new InMemoryProjectsRepository();
      const useCase = new SendProApplication(repository);
      const controller = new ProApplicationsController(useCase);

      const request: SendProApplicationDto = {
        age: 18,
        education_level: EducationLevel.HIGH_SCHOOL,
        internet_test: {
          download_speed: 40.3,
          upload_speed: 53.6,
        },
        past_experiences: {
          sales: true,
          support: false,
        },
        writing_score: 0.7,
      };

      const projects = [
        makeProject({ title: 'A', requiredScore: 1 }),
        makeProject({ title: 'B', requiredScore: 3 }),
        makeProject({ title: 'C', requiredScore: 5 }),
      ];

      const result = makeProApplicationResult(8);
      result.calculateEligibility(projects);
      result.selectProject();

      jest.spyOn(useCase, 'execute').mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve({ proApplicationResult: result });
          }),
      );

      const response = await controller.send(request);

      const expected = {
        score: 8,
        selected_project: 'C',
        eligible_projects: ['A', 'B', 'C'],
        ineligible_projects: [],
      };

      expect(response.score).toBe(expected.score);
      expect(response.selected_project).toBe(expected.selected_project);
      expect(response.eligible_projects).toStrictEqual(
        expected.eligible_projects,
      );
      expect(response.ineligible_projects).toStrictEqual(
        expected.ineligible_projects,
      );
    });
  });
});
