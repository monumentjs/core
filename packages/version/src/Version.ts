import { ToJSON, ToString } from '@monument/core';
import {
  Comparable,
  ComparisonResult,
  Equatable,
  MultiValueCompare,
  MultiValueEquals,
  NumberCompare,
  StrictEquals
} from '@monument/comparison';
import { argument } from '@monument/assert';
import { ReleaseStatus } from './ReleaseStatus';
import { VersionComponents } from './VersionComponents';
import { VersionBuilder } from './VersionBuilder';
import { VersionParser } from './VersionParser';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @immutable
 * @final
 */
export class Version
  implements Equatable<VersionComponents>, Equatable<string>, Comparable<VersionComponents>, Comparable<string>, ToJSON<string>, ToString {
  private static readonly VERSION_PRE_RELEASE_STAGES = {
    [ReleaseStatus.ALPHA]: 'alpha',
    [ReleaseStatus.BETA]: 'beta',
    [ReleaseStatus.RELEASE_CANDIDATE]: 'rc'
  };

  static readonly ZERO: Version = new Version();

  private _major!: number;
  private _minor!: number;
  private _patch!: number;
  private _releaseStatus!: ReleaseStatus;
  private _revision!: number;
  private _serialized: string | undefined;

  get major(): number {
    return this._major;
  }

  get minor(): number {
    return this._minor;
  }

  get nextMajor(): Version {
    return new Version(this.major + 1);
  }

  get nextMinor(): Version {
    return new Version(this.major, this.minor + 1);
  }

  get nextPatch(): Version {
    return new Version(this.major, this.minor, this.patch + 1);
  }

  get nextReleaseStatus(): Version {
    if (this.releaseStatus < ReleaseStatus.STABLE) {
      return new Version(this.major, this.minor, this.patch, this.releaseStatus + 1);
    }

    return this;
  }

  get nextRevision(): Version {
    return new Version(this.major, this.minor, this.patch, this.releaseStatus, this.revision + 1);
  }

  get patch(): number {
    return this._patch;
  }

  get releaseStatus(): ReleaseStatus {
    return this._releaseStatus;
  }

  get revision(): number {
    return this._revision;
  }

  constructor();
  constructor(components: VersionComponents);
  constructor(value: string);
  constructor(major: number);
  constructor(major: number, minor: number);
  constructor(major: number, minor: number, patch: number);
  constructor(major: number, minor: number, patch: number, releaseStatus: ReleaseStatus);
  constructor(major: number, minor: number, patch: number, releaseStatus: ReleaseStatus, revision: number);
  constructor(
    major: number | string | VersionComponents = 0,
    minor: number = 0,
    patch: number = 0,
    releaseStatus: ReleaseStatus = ReleaseStatus.ALPHA,
    revision: number = 0
  ) {
    let _major: number;
    let _minor: number;
    let _patch: number;
    let _releaseStatus: ReleaseStatus;
    let _revision: number;

    switch (typeof major) {
      case 'string':
        const parser: VersionParser = new VersionParser();
        const parsed: VersionComponents = parser.parse(major);

        _major = parsed.major;
        _minor = parsed.minor;
        _patch = parsed.patch;
        _releaseStatus = parsed.releaseStatus;
        _revision = parsed.revision;

        break;

      case 'object':
        const components: VersionComponents = major;

        _major = components.major;
        _minor = components.minor;
        _patch = components.patch;
        _releaseStatus = components.releaseStatus;
        _revision = components.revision;

        break;

      default:
        _major = major;
        _minor = minor;
        _patch = patch;
        _releaseStatus = releaseStatus;
        _revision = revision;
        break;
    }

    this.setMajor(_major);
    this.setMinor(_minor);
    this.setPatch(_patch);
    this.setReleaseStatus(_releaseStatus);
    this.setRevision(_revision);
  }

  compareTo(other: string): ComparisonResult;
  compareTo(other: VersionComponents): ComparisonResult;
  compareTo(other: VersionComponents | string): ComparisonResult {
    const components: VersionComponents = typeof other === 'object' ? other : new Version(other);

    return MultiValueCompare([
      [this.major, components.major, NumberCompare],
      [this.minor, components.minor, NumberCompare],
      [this.patch, components.patch, NumberCompare],
      [this.releaseStatus, components.releaseStatus, NumberCompare],
      [this.revision, components.revision, NumberCompare]
    ]);
  }

  equals(other: string): boolean;
  equals(other: VersionComponents): boolean;
  equals(other: VersionComponents | string): boolean {
    if (this === other) {
      return true;
    }

    const components: VersionComponents = typeof other === 'object' ? other : new Version(other);

    return MultiValueEquals([
      [this.major, components.major, StrictEquals],
      [this.minor, components.minor, StrictEquals],
      [this.patch, components.patch, StrictEquals],
      [this.releaseStatus, components.releaseStatus, StrictEquals],
      [this.revision, components.revision, StrictEquals]
    ]);
  }

  toJSON(): string {
    return this.toString();
  }

  toString(): string {
    if (this._serialized == null) {
      const { minor, major, patch, revision, releaseStatus } = this;
      let result = '';

      result += `${major}.${minor}.${patch}`;

      if (releaseStatus !== ReleaseStatus.STABLE) {
        const preReleaseStage: string = Version.VERSION_PRE_RELEASE_STAGES[releaseStatus];

        result += `-${preReleaseStage}`;

        if (revision > 0) {
          result += `.${revision}`;
        }
      }

      this._serialized = result.toString();
    }

    return this._serialized;
  }

  withMajor(value: number): Version {
    const builder: VersionBuilder = new VersionBuilder(this);

    builder.major = value;

    return builder.build();
  }

  withMinor(value: number): Version {
    const builder: VersionBuilder = new VersionBuilder(this);

    builder.minor = value;

    return builder.build();
  }

  withPatch(value: number): Version {
    const builder: VersionBuilder = new VersionBuilder(this);

    builder.patch = value;

    return builder.build();
  }

  withReleaseStatus(value: ReleaseStatus): Version {
    const builder: VersionBuilder = new VersionBuilder(this);

    builder.releaseStatus = value;

    return builder.build();
  }

  withRevision(value: number): Version {
    const builder: VersionBuilder = new VersionBuilder(this);

    builder.revision = value;

    return builder.build();
  }

  private setMajor(value: number) {
    argument(isFinite(value) && !isNaN(value) && value >= 0, 'Version major component is invalid.');

    this._major = value;
  }

  private setMinor(value: number) {
    argument(isFinite(value) && !isNaN(value) && value >= 0, 'Version minor component is invalid.');

    this._minor = value;
  }

  private setPatch(value: number) {
    argument(isFinite(value) && !isNaN(value) && value >= 0, 'Version patch component is invalid.');

    this._patch = value;
  }

  private setReleaseStatus(value: ReleaseStatus) {
    argument(isFinite(value) && !isNaN(value) && value >= ReleaseStatus.ALPHA || value <= ReleaseStatus.STABLE, 'Version release status is invalid.');

    this._releaseStatus = value;
  }

  private setRevision(value: number) {
    argument(isFinite(value) && !isNaN(value) && value >= 0, 'Version revision component is invalid.');

    this._revision = value;
  }
}
