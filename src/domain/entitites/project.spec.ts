import { Project } from './project.entity';

describe('Project', () => {
  it('should be able to create a project', () => {
    const project = new Project({
      requiredScore: 5,
      title: 'Project ABC',
    });

    expect(project).toBeTruthy();
    expect(project.title).toBe('Project ABC');
    expect(project.requiredScore).toBe(5);
  });
});
