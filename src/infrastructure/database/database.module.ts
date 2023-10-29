import { ProjectsRepository } from 'src/application/repositories/projects-repository';
import { Module } from '@nestjs/common';

import { ProjectsListRepository } from './repositories/projects-list-repository';

@Module({
  providers: [
    {
      provide: ProjectsRepository,
      useClass: ProjectsListRepository,
    },
  ],
  exports: [ProjectsRepository],
})
export class DatabaseModule {}
