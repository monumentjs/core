import { Type } from '@monument/core';
import { Metadata } from './Metadata';
import { Parameter } from './Parameter';

const KEY = Symbol();

export class Class {
  static of(type: Function): Class {
    let klass: Class | undefined = Reflect.getMetadata(KEY, type);

    if (klass == null) {
      klass = new Class(type);
      Reflect.defineMetadata(KEY, klass, type);
    }

    return klass;
  }

  readonly metadata = new Metadata();
  readonly parameters: ReadonlyArray<Parameter>;

  private constructor(readonly target: Function) {
    const types: Array<Type> = Reflect.getMetadata('design:paramtypes', target) || [];
    this.parameters = types.map((type, index) => new Parameter(type, index));
  }
}
