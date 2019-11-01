import { Equatable } from '@monument/comparison';
import { Component } from '../base/Component';

export interface Host extends Component, Equatable<Host> {
  readonly value: string | undefined;
  // TODO: isIP, asIP etc
}
