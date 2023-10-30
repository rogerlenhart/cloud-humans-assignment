import {
  EducationLevel,
  ProApplication,
  ProApplicationProps,
} from 'src/domain/entitites/pro-application.entity';

type Override = Partial<ProApplicationProps>;

export function makeProApplication(override: Override = {}) {
  return new ProApplication({
    age: 19,
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
    ...override,
  });
}
