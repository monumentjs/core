import { ReleaseStatus } from '@monument/version';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface VersionComponents {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
  readonly releaseStatus: ReleaseStatus;
  readonly revision: number;
}
