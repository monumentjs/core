/* tslint:disable:no-console */
import { BehaviorSubject, combineLatest, interval, Observable, of, throwError } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { Type } from '@monument/core';
import { Class } from '@monument/reflect';

export function Injectable(): ClassDecorator {
  return target => {
    return target;
  };
}

export interface ComponentFactory {
  has(type: Type): boolean;

  get<T extends object>(type: Type<T>): Observable<T>;
}

export interface HierarchicalComponentFactory extends ComponentFactory {
  readonly parent?: ComponentFactory;

  hasOwn(type: Type): boolean;
}

export interface ConfigurableComponentFactory extends HierarchicalComponentFactory {
  parent?: ComponentFactory;

  create<T extends object>(type: Type<T>): Observable<T>;

  destroy(instance: object): Observable<any>;
}

export class DefaultComponentFactory implements ConfigurableComponentFactory {
  private readonly subjects: Array<ProviderSubject>;

  parent?: ComponentFactory;

  constructor(providers: ReadonlyArray<ProviderConfiguration>) {
    this.subjects = providers.map(configuration => new GeneralProviderSubject(this, configuration));
  }

  get<T extends object>(type: Type<T>): Observable<T> {
    for (const subject of this.subjects) {
      if (subject.provide === type) {
        return subject as unknown as Observable<T>;
      }
    }

    if (this.parent?.has(type)) {
      return this.parent.get(type);
    }

    // todo: exception
    return throwError(new Error(`No provider found for class ${type.name}`));
  }

  create<T extends object>(type: Type<T>): Observable<T> {
    const deps: Array<Type> = Class.of(type).parameters.map(parameter => parameter.type);
    const deps$ = deps.length === 0 ? new BehaviorSubject([]) : combineLatest(deps.map(dep => this.get(dep)));

    return deps$.pipe(
      map(args => new type(...args))
    );
  }

  destroy(instance: object): Observable<void> {
    return of(undefined);
  }

  has(type: Type): boolean {
    return this.hasOwn(type) || this.parent?.has(type) || false;
  }

  hasOwn(type: Type): boolean {
    return this.subjects.some(subject => subject.provide === type);
  }
}

export interface FactoryComponent<T extends object = object> {
  create(): Observable<T>;
}

export interface ClassProviderConfiguration<T extends object = object> {
  provide: Type<T>;
  useClass: Type<T>;
  singleton?: boolean;
}

export interface ExistingProviderConfiguration<T extends object = object> {
  provide: Type<T>;
  useExisting: Type<T>;
  singleton?: boolean;
}

export interface FactoryProviderConfiguration<T extends object = object> {
  provide: Type<T>;
  useFactory: Type<FactoryComponent<T>>;
  singleton?: boolean;
}

export interface ValueProviderConfiguration<T extends object = object> {
  provide: Type<T>;
  useValue: T;
}

export type ProviderConfiguration<T extends object = object> =
  ClassProviderConfiguration<T>
  | FactoryProviderConfiguration<T>
  | ValueProviderConfiguration<T>
  | ExistingProviderConfiguration<T>;

export interface ProviderSubject<T extends object = object> extends Observable<T> {
  readonly provide: Type<T>;
  readonly isSingleton: boolean;
}

export class GeneralProviderSubject<T extends object = object> extends Observable<T> implements ProviderSubject<T> {
  readonly provide: Type<T>;
  readonly isSingleton: boolean;

  constructor(factory: ConfigurableComponentFactory, configuration: ProviderConfiguration<T>) {
    let subject: ProviderSubject<T>;

    if ('useClass' in configuration) {
      subject = new ClassProviderSubject(factory, configuration);
    } else if ('useFactory' in configuration) {
      subject = new FactoryProviderSubject(factory, configuration);
    } else if ('useExisting' in configuration) {
      subject = new ExistingProviderSubject(factory, configuration);
    } else if ('useValue' in configuration) {
      subject = new ValueProviderSubject(configuration);
    } else {
      // todo: improve exception
      throw new Error(`Invalid configuration`);
    }

    super(subscriber => subject.subscribe(subscriber));

    this.provide = subject.provide;
    this.isSingleton = subject.isSingleton;
  }
}

export abstract class AbstractProviderSubject<T extends object = object> extends Observable<T> implements ProviderSubject {
  readonly provide: Type<T>;
  readonly isSingleton: boolean;

  constructor(provide: Type<T>, isSingleton = true) {
    let singleton$: Observable<T> | undefined;
    let subscribers = 0;

    super(subscriber => {
      subscribers++;
      console.log('+', provide.name, 'has got a new subscriber,', subscribers, 'total');

      let instance: T | undefined;
      let source$: Observable<T>;

      if (isSingleton) {
        if (singleton$) {
          console.log('*', provide.name, 'use existing singleton');
          source$ = singleton$;
        } else {
          console.log('+', provide.name, 'create as singleton');
          source$ = singleton$ = this.instantiate().pipe(
            tap(() => console.log(`+ ${provide.name} has been created`)),
            shareReplay({ bufferSize: 1, refCount: true })
          );
        }
      } else {
        console.log('+', provide.name, 'create as prototype');
        source$ = this.instantiate().pipe(
          tap(() => console.log(`+ ${provide.name} has been created`))
        );
      }

      return source$.pipe(
        tap(_instance => instance = _instance)
      ).subscribe(subscriber).add(() => {
        subscribers--;
        console.log('-', provide.name, 'has lost a subscriber,', subscribers, 'total');

        if (instance) {
          if (isSingleton) {
            if (subscribers === 0) {
              console.log('-', provide.name, 'destroying singleton');
              this.destroy(instance).pipe(
                tap(() => console.log('-', provide.name, 'has been destroyed', '\n'))
              ).subscribe();
            }
          } else {
            console.log('-', provide.name, 'destroying prototype');
            this.destroy(instance).pipe(
              tap(() => console.log('-', provide.name, 'has been destroyed', '\n'))
            ).subscribe();
          }
        }
      });
    });

    this.provide = provide;
    this.isSingleton = isSingleton;
  }

  protected abstract instantiate(): Observable<T>;

  protected abstract destroy(instance: T): Observable<void>;
}

export class ClassProviderSubject<T extends object = object> extends AbstractProviderSubject<T> {
  private readonly factory: ConfigurableComponentFactory;
  private readonly useClass: Type<T>;

  constructor(factory: ConfigurableComponentFactory, { provide, useClass, singleton = true }: ClassProviderConfiguration<T>) {
    super(provide, singleton);
    this.factory = factory;
    this.useClass = useClass;
  }

  protected instantiate(): Observable<T> {
    return this.factory.create(this.useClass);
  }

  protected destroy(instance: T): Observable<any> {
    return this.factory.destroy(instance);
  }
}

export class FactoryProviderSubject<T extends object = object> extends AbstractProviderSubject<T> {
  private readonly factory: ConfigurableComponentFactory;
  private readonly useFactory: Type<FactoryComponent<T>>;

  constructor(factory: ConfigurableComponentFactory, { provide, useFactory, singleton = true }: FactoryProviderConfiguration<T>) {
    super(provide, singleton);

    this.factory = factory;
    this.useFactory = useFactory;
  }

  protected instantiate(): Observable<T> {
    return this.factory.get(this.useFactory).pipe(switchMap(factory => factory.create()));
  }

  protected destroy(instance: T): Observable<any> {
    return this.factory.destroy(instance);
  }
}

export class ExistingProviderSubject<T extends object = object> extends Observable<T> implements ProviderSubject<T> {
  readonly provide: Type<T>;
  readonly isSingleton: boolean;

  constructor(factory: ConfigurableComponentFactory, { provide, useExisting, singleton = true }: ExistingProviderConfiguration<T>) {
    let source$: Observable<T> | undefined;

    super(subscriber => {
      if (source$ == null) {
        source$ = factory.get(useExisting).pipe(
          singleton ? shareReplay(1) : map(instance => instance)
        );
      }

      return source$.subscribe(subscriber);
    });

    this.provide = provide;
    this.isSingleton = singleton;
  }
}

export class ValueProviderSubject<T extends object = object> extends Observable<T> implements ProviderSubject<T> {
  readonly provide: Type<T>;
  readonly isSingleton: boolean;

  constructor({ provide, useValue }: ValueProviderConfiguration<T>) {
    let source$: Observable<T> | undefined;

    super(subscriber => {
      if (source$ == null) {
        source$ = of(useValue).pipe(shareReplay(1));
      }

      return source$.subscribe(subscriber);
    });

    this.provide = provide;
    this.isSingleton = true;
  }
}

// Example --------------------------------------------------------

class Cache {
  static n = 0;

  readonly n: number;

  constructor() {
    this.n = Cache.n++;
  }
}

@Injectable()
class CacheFactory implements FactoryComponent<Cache> {
  static n = 0;

  readonly n: number;

  constructor() {
    this.n = CacheFactory.n++;
  }

  create(): Observable<Cache> {
    return interval(1000).pipe(
      take(3),
      tap(i => console.log(`\nNew cache - ${i}\n`)),
      map(() => new Cache())
    );
  }
}

@Injectable()
class Logger {
  static n = 0;

  readonly n: number;

  constructor(
    private cache: Cache
  ) {
    this.n = Logger.n++;
  }
}

@Injectable()
class UserService {
  static n = 0;

  readonly n: number;

  constructor(
    private logger: Logger,
    private cache: Cache
  ) {
    this.n = UserService.n++;
  }
}

@Injectable()
class AuthService {
  static n = 0;

  readonly n: number;

  constructor(
    private userService: UserService,
    private logger: Logger,
    private cache: Cache
  ) {
    this.n = AuthService.n++;
  }
}

@Injectable()
class LoginHandler {
  constructor(
    private cache: Cache
  ) {
    console.log('LoginHandler has been created');
  }
}

@Injectable()
class Application {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private logger: Logger,
    private cache: Cache
  ) {
  }
}

const factory: ConfigurableComponentFactory = new DefaultComponentFactory([
  { provide: CacheFactory, useClass: CacheFactory },
  { provide: Cache, useFactory: CacheFactory },
  { provide: Logger, useClass: Logger, singleton: false },
  { provide: LoginHandler, useClass: LoginHandler },
  { provide: UserService, useClass: UserService },
  { provide: AuthService, useClass: AuthService },
  { provide: Application, useClass: Application }
]);

const subscription = factory.get(Application).subscribe({
  next: application => {
    console.log('\n');
    console.log(application);
    console.log('\n');

    setTimeout(() => {
      console.log('TERMINATE');
      console.log('\n');
      subscription.unsubscribe();
    }, 10000);
  },
  complete: () => {
    console.log('COMPLETE');
  }
});
