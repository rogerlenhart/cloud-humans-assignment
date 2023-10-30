import {
  Project,
  ProjectProps,
} from './../../src/domain/entitites/project.entity';

type Override = Partial<ProjectProps>;

export function makeProject(override: Override = {}) {
  return new Project({
    requiredScore: 5,
    title: 'Default Project',
    ...override,
  });
}
