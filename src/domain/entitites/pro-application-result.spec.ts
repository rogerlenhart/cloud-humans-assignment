import { makeProject } from '~/test/factories/project';
import { ProApplicationResult } from './pro-application-result.entity';

describe('Pro Application Result', () => {
  it('should be able to create a pro application result', () => {
    const proApplicationResult = new ProApplicationResult(9);

    expect(proApplicationResult).toBeTruthy();
    expect(proApplicationResult.score).toBe(9);
    expect(proApplicationResult.selected_project).toBe('');
    expect(proApplicationResult.eligible_projects.length).toBe(0);
    expect(proApplicationResult.ineligible_projects.length).toBe(0);
  });

  test.each([
    [1, '', [], ['A', 'B', 'C']],
    [2, 'A', ['A'], ['B', 'C']],
    [4, 'B', ['A', 'B'], ['C']],
    [6, 'C', ['A', 'B', 'C'], []],
  ])(
    'given score %p, should return correct projects',
    (score, selected, eligible, ineligible) => {
      const projects = [
        makeProject({ title: 'A', requiredScore: 1 }),
        makeProject({ title: 'B', requiredScore: 3 }),
        makeProject({ title: 'C', requiredScore: 5 }),
      ];

      const proApplicationResult = new ProApplicationResult(score);

      proApplicationResult.calculateEligibility(projects);
      proApplicationResult.selectProject();

      expect(proApplicationResult.score).toBe(score);
      expect(proApplicationResult.selected_project).toBe(selected);
      expect(proApplicationResult.eligible_projects).toStrictEqual(eligible);
      expect(proApplicationResult.ineligible_projects).toStrictEqual(
        ineligible,
      );
    },
  );
});
