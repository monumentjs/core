import { Type } from '@monument/core';
import { Parameter } from './Parameter';

export class Constructor {
  readonly parameters: ReadonlyArray<Parameter>;

  constructor(target: Function) {
    const types: Array<Type> = Reflect.getMetadata('design:paramtypes', target) || [];

    this.parameters = types.map((type, index) => new Parameter(type, index));
  }
}
