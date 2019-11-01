import { Equatable } from '@monument/comparison';
import { ReadOnlyList } from '@monument/collections';
import { Component } from '../base/Component';
import { PathSegment } from './PathSegment';

export interface Path extends Component, Equatable<Path> {
  readonly segments: ReadOnlyList<PathSegment>;
  readonly extension: string;
}
