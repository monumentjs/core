import { BehaviorSubject, Observable } from 'rxjs';
import { Type } from '@monument/core';
import { Context } from './Context';
import { ExtensionInterface, ProviderConfiguration } from '../..';
import { ContextSchema } from '../schema/ContextSchema';

export class DefaultContext implements Context {
  static create(schema: ContextSchema): DefaultContext {
    const cache = new Map<Type, Context>();
  }

  private readonly running$ = new BehaviorSubject<boolean>(false);
  private readonly dependencies: ReadonlyArray<Context>;

  readonly name: string;
  readonly parent: Context | undefined;

  get running(): Observable<boolean> {
    return this.running$;
  }

  private constructor(
    source: Type,
    providers: ReadonlyArray<ProviderConfiguration>,
    exports: ReadonlyArray<Type>,
    extensions: ReadonlyArray<Type<ExtensionInterface>>,
    cache: Map<Type, Context>
  ) {
    this.name = source.name;

    console.log('Name', this.name);
    console.log('Source', source);
    console.log('Parent', parent);
    console.log('Dependencies', dependencies);
    console.log('Providers', providers);
    console.log('Exports', exports);
    console.log('Extensions', extensions);
    console.log('\n');
  }

  get<T extends object>(type: Type<T>, onlySelf?: boolean, skipSelf?: boolean): Observable<T> | undefined {
    return undefined;
  }

  start(): void {
    if (!this.running$.value) {
      this.running$.next(true);

      for (const dependency of this.dependencies) {
        dependency.start();
      }
    }
  }

  stop(): void {
    if (this.running$.value) {
      this.running$.next(false);

      for (const dependency of this.dependencies) {
        dependency.stop();
      }
    }
  }
}
