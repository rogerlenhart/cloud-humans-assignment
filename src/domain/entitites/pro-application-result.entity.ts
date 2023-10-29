interface ProApplicationResultProps {
  score: number;
  selected_project: string;
  eligible_projects: string[];
  ineligible_projects: string[];
}

export class ProApplicationResult {
  private props: ProApplicationResultProps;

  constructor(props: ProApplicationResultProps) {
    this.props = props;
  }

  get score(): number {
    return this.props.score;
  }

  get selected_project(): string {
    return this.props.selected_project;
  }

  get eligible_projects(): string[] {
    return this.props.eligible_projects;
  }

  get ineligible_projects(): string[] {
    return this.props.ineligible_projects;
  }
}
