import { argument } from '@monument/assert';
import { Version } from './Version';
import { ReleaseStatus } from './ReleaseStatus';
import { Builder, VersionComponents } from '@monument/contracts';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class VersionBuilder implements VersionComponents, Builder<Version> {
  private _major!: number;
  private _minor!: number;
  private _patch!: number;
  private _releaseStatus!: ReleaseStatus;
  private _revision!: number;

  get major(): number {
    return this._major;
  }

  set major(value: number) {
    argument(isFinite(value), 'Major component must be a finite number');
    argument(!isNaN(value), 'Major component must be a number');
    argument(value >= 0, 'Major component must be greater than or equal to 0');

    this._major = value;
  }

  get minor(): number {
    return this._minor;
  }

  set minor(value: number) {
    argument(isFinite(value), 'Minor component must be a finite number');
    argument(!isNaN(value), 'Minor component must be a number');
    argument(value >= 0, 'Minor component must be greater than or equal to 0');

    this._minor = value;
  }

  get patch(): number {
    return this._patch;
  }

  set patch(value: number) {
    argument(isFinite(value), 'Patch component must be a finite number');
    argument(!isNaN(value), 'Patch component must be a number');
    argument(value >= 0, 'Patch component must be greater than or equal to 0');

    this._patch = value;
  }

  get releaseStatus(): ReleaseStatus {
    return this._releaseStatus;
  }

  set releaseStatus(value: ReleaseStatus) {
    argument(isFinite(value), 'Release status must be a finite number');
    argument(!isNaN(value), 'Release status must be a number');
    argument(value >= ReleaseStatus.ALPHA, 'Lowest release status is ALPHA');
    argument(value <= ReleaseStatus.STABLE, 'Highest release status is STABLE');

    this._releaseStatus = value;
  }

  get revision(): number {
    return this._revision;
  }

  set revision(value: number) {
    argument(isFinite(value), 'Revision component must be a finite number');
    argument(!isNaN(value), 'Revision component must be a number');
    argument(value >= 0, 'Revision component must be greater than or equal to 0');

    this._revision = value;
  }

  constructor();
  constructor(components: VersionComponents);
  constructor(major: number);
  constructor(major: number, minor: number);
  constructor(major: number, minor: number, patch: number);
  constructor(major: number, minor: number, patch: number, releaseStatus: ReleaseStatus);
  constructor(major: number, minor: number, patch: number, releaseStatus: ReleaseStatus, revision: number);
  constructor(
    major: VersionComponents | number = 0,
    minor: number = 0,
    patch: number = 0,
    releaseStatus: ReleaseStatus = ReleaseStatus.ALPHA,
    revision: number = 0
  ) {
    if (typeof major === 'object') {
      const components: VersionComponents = major;
      this.major = components.major;
      this.minor = components.minor;
      this.patch = components.patch;
      this.releaseStatus = components.releaseStatus;
      this.revision = components.revision;
    } else {
      this.major = major;
      this.minor = minor;
      this.patch = patch;
      this.releaseStatus = releaseStatus;
      this.revision = revision;
    }
  }

  build(): Version {
    return new Version(this);
  }
}
