import { Constructor } from './Constructor';
import { Metadata } from './Metadata';
import { Type } from '@monument/core';

const KEY = Symbol();

export class Class {
  static of(type: Type): Class {
    let klass: Class | undefined = Reflect.getMetadata(KEY, type);

    if (klass == null) {
      klass = new Class(type);
      Reflect.defineMetadata(KEY, klass, type);
    }

    return klass;
  }

  readonly metadata = new Metadata();
  readonly ctor: Constructor;

  private constructor(readonly target: Type) {
    this.ctor = new Constructor(target);
  }
}
