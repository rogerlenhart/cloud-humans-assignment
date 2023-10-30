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
});
