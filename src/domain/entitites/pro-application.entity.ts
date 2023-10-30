export enum EducationLevel {
  NO_EDUCATION = 'no_education',
  HIGH_SCHOOL = 'high_school',
  BACHELORS_DEGREE_OR_HIGH = 'bachelors_degree_or_high',
}

export interface PastExperinces {
  sales: boolean;
  support: boolean;
}
export interface InternetTest {
  download_speed: number;
  upload_speed: number;
}

export interface ProApplicationProps {
  age: number;
  education_level: EducationLevel;
  past_experiences: PastExperinces;
  internet_test: InternetTest;
  writing_score: number;
  referral_code?: string | null;
}

export class ProApplication {
  private props: ProApplicationProps;

  constructor(props: ProApplicationProps) {
    this.props = props;
  }

  get age(): number {
    return this.props.age;
  }

  get education_level(): EducationLevel {
    return this.props.education_level;
  }

  get past_experiences(): PastExperinces {
    return this.props.past_experiences;
  }

  get internet_test(): InternetTest {
    return this.props.internet_test;
  }

  get writing_score(): number {
    return this.props.writing_score;
  }

  get referral_code(): string {
    return this.props.referral_code;
  }

  public calculateScore(): number {
    if (this.isUnderAge()) return 0;
    return (
      this.calculateEducationScore() +
      this.calculateExperienceScore() +
      this.calculateInternetScore() +
      this.calculateWritingScore() +
      this.calculateReferralCodeScore()
    );
  }

  public isUnderAge(): boolean {
    return this.age < 18;
  }

  public calculateEducationScore(): number {
    const educationLevelScore: Record<EducationLevel, number> = {
      no_education: 0,
      high_school: 1,
      bachelors_degree_or_high: 2,
    };

    return educationLevelScore[this.education_level];
  }

  public calculateExperienceScore(): number {
    const { sales, support } = this.past_experiences;
    return (sales ? 5 : 0) + (support ? 3 : 0);
  }

  public calculateInternetScore(): number {
    const { download_speed, upload_speed } = this.internet_test;
    return (
      this.calculateInternetScoreBySpeed(download_speed) +
      this.calculateInternetScoreBySpeed(upload_speed)
    );
  }

  private calculateInternetScoreBySpeed(speed: number): number {
    if (speed > 50) {
      return 1;
    } else if (speed < 5) {
      return -1;
    } else {
      return 0;
    }
  }

  public calculateWritingScore(): number {
    if (this.writing_score < 0.3) {
      return -1;
    } else if (this.writing_score <= 0.7) {
      return 1;
    } else {
      return 2;
    }
  }

  public calculateReferralCodeScore(): number {
    return this.referral_code === 'token1234' ? 1 : 0;
  }
}
