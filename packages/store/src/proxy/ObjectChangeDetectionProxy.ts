import { Disposable } from '@monument/core';
import { Observable, Subject } from 'rxjs';
import { ChangeKind } from './ChangeKind';
import { ChangeEvent } from './ChangeEvent';
import { ChangeDetectionProxy } from './ChangeDetectionProxy';

export class ObjectChangeDetectionProxy<T extends object> implements ChangeDetectionProxy, Disposable {
  private readonly _target: T;
  private readonly _key?: PropertyKey;
  private readonly _parent?: ChangeDetectionProxy;
  private readonly _changed: Subject<ChangeEvent> = new Subject();
  private readonly _proxy: T;

  get parent(): ChangeDetectionProxy | undefined {
    return this._parent;
  }

  get changed(): Observable<ChangeEvent> {
    return this._changed;
  }

  get proxy(): T {
    return this._proxy;
  }

  get path(): PropertyKey[] {
    const path: PropertyKey[] = [];

    if (this._parent) {
      path.push(...this._parent.path);
    }

    if (this._key) {
      path.push(this._key);
    }

    return path;
  }

  constructor(instance: T, key?: keyof T, parent?: ChangeDetectionProxy) {
    this._target = instance;
    this._key = key;
    this._parent = parent;
    this._proxy = new Proxy(instance, {
      get: (target: T, p: keyof T): T[typeof p] => {
        const original: T[typeof p] = target[p];

        if (original instanceof Function) {
          return new Proxy(original, {
            apply: (_target: T[typeof p] & Function, thisArg: any, argArray?: any): any => {
              const returnValue = _target.apply(thisArg, argArray);

              this.onChange(new ChangeEvent(ChangeKind.CALL, [...this.path, p]));

              return returnValue;
            }
          });
        }

        if (typeof original === 'object') {
          return new ObjectChangeDetectionProxy<any>(original, p, this)._proxy;
        }

        return original;
      },
      set: (target: T, p: keyof T, value: T[typeof p]): boolean => {
        target[p] = value;

        this.onChange(new ChangeEvent(ChangeKind.SET, [...this.path, p]));

        return true;
      },
      deleteProperty: (target: T, p: keyof T): boolean => {
        delete target[p];

        this.onChange(new ChangeEvent(ChangeKind.DELETE, [...this.path, p]));

        return true;
      }
    });
  }

  onChange(event: ChangeEvent): void {
    this._changed.next(event);

    if (this.parent) {
      this.parent.onChange(event);
    }
  }

  dispose(): void {
    this._changed.complete();
  }
}
