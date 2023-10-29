import { Project } from 'src/domain/entitites/project.entity';

export abstract class ProjectsRepository {
  abstract getAll(): Promise<Project[]>;
}
