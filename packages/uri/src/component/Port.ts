import { ToJSON } from '@monument/core';
import { Equatable } from '@monument/comparison';
import { Component } from '../base/Component';

export interface Port extends Component, Equatable<Port>, ToJSON<number | undefined> {
  readonly value: number | undefined;
}
