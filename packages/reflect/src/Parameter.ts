import { Type } from '@monument/core';
import { Metadata } from './Metadata';

export class Parameter {
  readonly metadata = new Metadata();

  constructor(readonly type: Type, readonly index: number) {
  }
}
