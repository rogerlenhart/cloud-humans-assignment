export interface ProjectProps {
  title: string;
  requiredScore: number;
}

export class Project {
  private props: ProjectProps;

  constructor(props: ProjectProps) {
    this.props = props;
  }

  get title(): string {
    return this.props.title;
  }

  get requiredScore(): number {
    return this.props.requiredScore;
  }
}
