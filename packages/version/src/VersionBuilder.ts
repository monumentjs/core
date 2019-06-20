import { Builder, InvalidArgumentException } from '@monument/core';
import { Version } from './Version';
import { ReleaseStatus } from './ReleaseStatus';
import { VersionComponents } from './VersionComponents';

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
    if (!isFinite(value) || isNaN(value) || value < 0) {
      throw new InvalidArgumentException('Version major component is invalid.');
    }

    this._major = value;
  }

  get minor(): number {
    return this._minor;
  }

  set minor(value: number) {
    if (!isFinite(value) || isNaN(value) || value < 0) {
      throw new InvalidArgumentException('Version minor component is invalid.');
    }

    this._minor = value;
  }

  get patch(): number {
    return this._patch;
  }

  set patch(value: number) {
    if (!isFinite(value) || isNaN(value) || value < 0) {
      throw new InvalidArgumentException('Version patch component is invalid.');
    }

    this._patch = value;
  }

  get releaseStatus(): ReleaseStatus {
    return this._releaseStatus;
  }

  set releaseStatus(value: ReleaseStatus) {
    if (!isFinite(value) || isNaN(value) || value < ReleaseStatus.ALPHA || value > ReleaseStatus.STABLE) {
      throw new InvalidArgumentException('Version release status component is invalid.');
    }

    this._releaseStatus = value;
  }

  get revision(): number {
    return this._revision;
  }

  set revision(value: number) {
    if (!isFinite(value) || isNaN(value) || value < 0) {
      throw new InvalidArgumentException('Version revision component is invalid.');
    }

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
    switch (typeof major) {
      case 'object':
        const components: VersionComponents = major;
        this.major = components.major;
        this.minor = components.minor;
        this.patch = components.patch;
        this.releaseStatus = components.releaseStatus;
        this.revision = components.revision;
        break;
      default:
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.releaseStatus = releaseStatus;
        this.revision = revision;
        break;
    }
  }

  build(): Version {
    return new Version(this);
  }
}
