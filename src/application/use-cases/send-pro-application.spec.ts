import {
  SendProApplication,
  SendProApplicationRequest,
} from './send-pro-application';

import { InMemoryProjectsRepository } from '~/test/repositories/InMemoryProjectsRepository';
import { EducationLevel } from 'src/domain/entitites/pro-application.entity';
import { makeProject } from '~/test/factories/project';

describe('SendProApplication', () => {
  it('should be able to send pro application', async () => {
    const projectsRepository = new InMemoryProjectsRepository();
    const sendProApplication = new SendProApplication(projectsRepository);

    await projectsRepository.create(
      makeProject({ title: 'A', requiredScore: 1 }),
    );

    await projectsRepository.create(
      makeProject({ title: 'B', requiredScore: 3 }),
    );

    await projectsRepository.create(
      makeProject({ title: 'C', requiredScore: 5 }),
    );

    const request: SendProApplicationRequest = {
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

    const { proApplicationResult } = await sendProApplication.execute(request);

    const expected = {
      score: 8,
      selected_project: 'C',
      eligible_projects: ['A', 'B', 'C'],
      ineligible_projects: [],
    };

    expect(proApplicationResult.score).toBe(expected.score);
    expect(proApplicationResult.selected_project).toBe(
      expected.selected_project,
    );
    expect(proApplicationResult.eligible_projects).toStrictEqual(
      expected.eligible_projects,
    );
    expect(proApplicationResult.ineligible_projects).toStrictEqual(
      expected.ineligible_projects,
    );
  });
});
