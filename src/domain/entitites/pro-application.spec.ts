import { EducationLevel, ProApplication } from './pro-application.entity';

describe('Pro Application', () => {
  it('should be able to create a pro application', () => {
    const proApplication = new ProApplication({
      age: 18,
      education_level: EducationLevel.HIGH_SCHOOL,
      internet_test: {
        download_speed: 40.6,
        upload_speed: 32.3,
      },
      past_experiences: {
        sales: true,
        support: false,
      },
      writing_score: 0.7,
    });

    expect(proApplication).toBeTruthy();
  });
});
