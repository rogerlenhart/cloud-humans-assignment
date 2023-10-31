import { Project } from './project.entity';

export interface ProApplicationResultProps {
  score: number;
  selected_project: Project;
  eligible_projects: Project[];
  ineligible_projects: Project[];
}

export class ProApplicationResult {
  private props: ProApplicationResultProps = {
    score: 0,
    selected_project: null,
    ineligible_projects: [],
    eligible_projects: [],
  };

  constructor(score: number) {
    this.props.score = score;
  }

  get score(): number {
    return this.props.score;
  }

  get selected_project(): string {
    return this.props.selected_project?.title ?? '';
  }

  get eligible_projects(): string[] {
    return this.getProjectTitles(this.props.eligible_projects);
  }

  get ineligible_projects(): string[] {
    return this.getProjectTitles(this.props.ineligible_projects);
  }

  public calculateEligibility(projects: Project[]) {
    const eligible = [];
    const ineligible = [];

    projects.forEach((project) => {
      if (this.score > project.requiredScore) {
        eligible.push(project);
      } else {
        ineligible.push(project);
      }
    });

    this.props.eligible_projects = eligible;
    this.props.ineligible_projects = ineligible;
  }

  public selectProject() {
    if (this.props.eligible_projects.length > 0) {
      this.props.selected_project = this.props.eligible_projects.reduce(
        (max, current) => {
          return max.requiredScore > current.requiredScore ? max : current;
        },
      );
    }
  }

  public getProjectTitles(projects: Project[]) {
    return projects.map((project) => project.title);
  }
}
