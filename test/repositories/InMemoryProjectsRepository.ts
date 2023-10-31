import { Project } from 'src/domain/entitites/project.entity';
import { ProjectsRepository } from '~/application/repositories/projects-repository';

export class InMemoryProjectsRepository implements ProjectsRepository {
  public projects: Project[] = [];

  async create(project: Project) {
    this.projects.push(project);
  }

  async getAll(): Promise<Project[]> {
    return this.projects;
  }
}
