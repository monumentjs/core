import { Equatable } from '@monument/comparison';
import { Component } from '../base/Component';

export interface PathSegment extends Component<string>, Equatable<PathSegment> {
  readonly isEmpty: boolean;
  readonly isDotSegment: boolean;
}
