import { Injectable } from '@nestjs/common';

import { ProjectsRepository } from 'src/application/repositories/projects-repository';
import { Project } from 'src/domain/entitites/project.entity';

@Injectable()
export class ProjectsListRepository implements ProjectsRepository {
  private projects = [
    new Project({
      title: 'Calculate the Dark Matter of the universe for Nasa',
      requiredScore: 10,
    }),
    new Project({
      title: "Determine if the Schrodinger's cat is alive",
      requiredScore: 5,
    }),
    new Project({
      title: 'Attend to users support for a YXZ Company',
      requiredScore: 3,
    }),
    new Project({
      title:
        'Collect specific people information from their social media for XPTO Company',
      requiredScore: 2,
    }),
  ];

  async getAll(): Promise<Project[]> {
    return this.projects;
  }
}
