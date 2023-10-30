import { makeProApplication } from '~/test/factories/pro-application';
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

  it('should calculate score 0 for under age pro', () => {
    const proApplication = makeProApplication({ age: 17 });

    const score = proApplication.calculateScore();

    expect(score).toBe(0);
  });

  test.each([
    [EducationLevel.NO_EDUCATION, 0],
    [EducationLevel.HIGH_SCHOOL, 1],
    [EducationLevel.BACHELORS_DEGREE_OR_HIGH, 2],
  ])(
    'given education level %p, should return %p point(s)',
    (educationLevel, expected) => {
      const proApplication = makeProApplication({
        education_level: educationLevel,
      });

      const score = proApplication.calculateEducationScore();

      expect(score).toBe(expected);
    },
  );

  test.each([
    [true, false, 5],
    [false, true, 3],
    [true, true, 8],
    [false, false, 0],
  ])(
    'given sales %p and support %p, should return %p point(s)',
    (sales, support, expected) => {
      const proApplication = makeProApplication({
        past_experiences: {
          sales: sales,
          support: support,
        },
      });

      const score = proApplication.calculateExperienceScore();

      expect(score).toBe(expected);
    },
  );

  test.each([
    [50.1, 50, 1],
    [4.9, 50, -1],
    [4.9, 3, -2],
    [50.1, 50.1, 2],
    [50, 5, 0],
  ])(
    'given %p download and %p upload, should return %p point(s)',
    (download, upload, expected) => {
      const proApplication = makeProApplication({
        internet_test: {
          download_speed: download,
          upload_speed: upload,
        },
      });

      const score = proApplication.calculateInternetScore();

      expect(score).toBe(expected);
    },
  );

  test.each([
    [0.29, -1],
    [0.3, 1],
    [0.7, 1],
    [0.71, 2],
  ])(
    'given %p writing score, should return %p point(s)',
    (writingScore, expected) => {
      const proApplication = makeProApplication({
        writing_score: writingScore,
      });

      const score = proApplication.calculateWritingScore();

      expect(score).toBe(expected);
    },
  );

  test.each([
    ['token123', 0],
    ['token1234', 1],
  ])(
    'given referral code %p, should return %p point(s)',
    (referralCode, expected) => {
      const proApplication = makeProApplication({
        referral_code: referralCode,
      });

      const score = proApplication.calculateReferralCodeScore();

      expect(score).toBe(expected);
    },
  );
});
