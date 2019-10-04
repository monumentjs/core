import { Parser } from '@monument/text';
import { VersionComponents } from './VersionComponents';
import { VersionFormatException } from './exception/VersionFormatException';
import { ReleaseStatus } from './ReleaseStatus';

const PATTERN = /^(\d+)\.(\d+)\.(\d+)(-(alpha|beta|rc)(\.(\d+))?)?$/;
const MAJOR_INDEX = 1;
const MINOR_INDEX = 2;
const PATCH_INDEX = 3;
const RELEASE_STATUS_INDEX = 5;
const REVISION_INDEX = 7;

export class VersionParser implements Parser<VersionComponents> {
  private static getMajor(source: string): number {
    return parseInt(source, 10);
  }

  private static getMinor(source: string): number {
    return parseInt(source, 10);
  }

  private static getPatch(source: string): number {
    return parseInt(source, 10);
  }

  private static getReleaseStatus(source: string | undefined): ReleaseStatus {
    switch (source) {
      case 'alpha':
        return ReleaseStatus.ALPHA;

      case 'beta':
        return ReleaseStatus.BETA;

      case 'rc':
        return ReleaseStatus.RELEASE_CANDIDATE;

      default:
        return ReleaseStatus.STABLE;
    }
  }

  private static getRevision(source: string | undefined): number {
    if (source) {
      return parseInt(source, 10);
    } else {
      return 0;
    }
  }

  canParse(source: string): boolean {
    return PATTERN.test(source);
  }

  parse(source: string): VersionComponents {
    const parts: RegExpExecArray | null = PATTERN.exec(source);

    if (!parts) {
      throw new VersionFormatException(`Expression "${source}" is not a valid version`);
    }

    const major = VersionParser.getMajor(parts[MAJOR_INDEX]);
    const minor = VersionParser.getMinor(parts[MINOR_INDEX]);
    const patch = VersionParser.getPatch(parts[PATCH_INDEX]);
    const releaseStatus = VersionParser.getReleaseStatus(parts[RELEASE_STATUS_INDEX]);
    const revision = VersionParser.getRevision(parts[REVISION_INDEX]);

    return { major, minor, patch, releaseStatus, revision };
  }
}
