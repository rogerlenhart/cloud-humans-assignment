import { ProApplicationResult } from 'src/domain/entitites/pro-application-result.entity';

export function makeProApplicationResult(score: number) {
  return new ProApplicationResult(score);
}
