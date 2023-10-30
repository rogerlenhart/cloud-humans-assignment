import { ProApplicationResult } from './pro-application-result.entity';

describe('Pro Application Result', () => {
  it('should be able to create a pro application result', () => {
    const proApplicationResult = new ProApplicationResult(9);

    expect(proApplicationResult).toBeTruthy();
  });
});
