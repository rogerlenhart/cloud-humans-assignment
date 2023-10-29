import { Project } from './project.entity';

interface ProApplicationResultProps {
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

  constructor(score: number, projects: Project[]) {
    this.props.score = score;
    this.calculateEligibility(projects);
    if (score > 0) this.selectProject();
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

  private calculateEligibility(projects: Project[]) {
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

  private selectProject() {
    this.props.selected_project = this.props.eligible_projects.reduce(
      (max, current) => {
        return max.requiredScore > current.requiredScore ? max : current;
      },
    );
  }

  public getProjectTitles(projects: Project[]) {
    return projects.map((project) => project.title);
  }
}
