/* tslint:disable:no-console */
import { BehaviorSubject, combineLatest, Observable, of, throwError } from 'rxjs';
import { map, mergeMap, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Delegate, Disposable, Type, TypeRef } from '@monument/core';
import { Class } from '@monument/reflect';
import { RuntimeException } from '@monument/exceptions';
import { Key } from '@monument/collections';

export class ComponentDefinitionException extends RuntimeException {
}

export class NoSuchComponentException extends RuntimeException {
}

export interface InjectableConfiguration {
  singleton?: boolean;
}

export const INJECTABLE = new Key<InjectableConfiguration>('INJECTABLE');

export function Injectable(configuration: InjectableConfiguration = {}): ClassDecorator {
  return target => {
    const klass = Class.of(target as any);

    klass.metadata.decorate(Injectable, INJECTABLE, configuration);
  };
}

export function ComponentExtension(): ClassDecorator {
  return target => {
    Injectable()(target);

    return target;
  };
}

export interface Lifecycle {
  readonly running: Observable<boolean>;

  start(): void;

  stop(): void;
}

export abstract class AbstractLifecycle implements Lifecycle {
  private readonly running$ = new BehaviorSubject<boolean>(false);

  get running(): Observable<boolean> {
    return this.running$.asObservable();
  }

  start(): void {
    if (!this.running$.value) {
      this.running$.next(true);
    }
  }

  stop(): void {
    if (this.running$.value) {
      this.running$.next(false);
    }
  }
}

export interface ComponentExtensionInterface<T extends object = object> {
  apply(source: Observable<T>): Observable<T>;

  destroy(source: Observable<T>): Observable<T>;
}

export interface ComponentFactory {
  has(type: Type | TypeRef): boolean;

  get<T extends object>(type: Type<T> | TypeRef<T>): Observable<T>;

  getAll<T extends object>(type: Type<T> | TypeRef<T>): Observable<ReadonlyArray<T>>;

  getMany(types: ReadonlyArray<Type | TypeRef>): Observable<ReadonlyArray<object>>;
}

export interface ComponentSubjectFactory extends ComponentFactory {
  instantiate<T extends object>(type: Type<T>): Observable<T>;

  destroy(instance: object): Observable<any>;
}

export interface ExtendableComponentFactory extends ComponentSubjectFactory {
  readonly extensions: ReadonlyArray<Type<ComponentExtensionInterface> | TypeRef<ComponentExtensionInterface>>;

  getExtensions(): Observable<ReadonlyArray<ComponentExtensionInterface>>;
}

export interface HierarchicalComponentFactory extends ExtendableComponentFactory {
  readonly parent: HierarchicalComponentFactory | undefined;
  readonly dependencies: ReadonlyArray<ComponentFactory>;

  hasOwn(type: Type | TypeRef): boolean;
}

export interface ConfigurableComponentFactory extends HierarchicalComponentFactory, ComponentSubjectFactory, Lifecycle {
  parent: HierarchicalComponentFactory | undefined;
}

export class DefaultComponentFactory extends AbstractLifecycle implements ConfigurableComponentFactory {
  private readonly subjects: Array<ComponentSubject>;

  readonly dependencies: ReadonlyArray<ComponentFactory>;
  readonly extensions: ReadonlyArray<Type<ComponentExtensionInterface> | TypeRef<ComponentExtensionInterface>>;

  parent: HierarchicalComponentFactory | undefined;

  constructor(
    configurations: ReadonlyArray<ComponentConfiguration> = [],
    dependencies: ReadonlyArray<ComponentFactory> = [],
    extensions: ReadonlyArray<Type<ComponentExtensionInterface> | TypeRef<ComponentExtensionInterface>> = [],
    parent?: HierarchicalComponentFactory
  ) {
    super();
    this.parent = parent;
    this.dependencies = dependencies;
    this.extensions = extensions;
    this.subjects = configurations.map(configuration => new GeneralComponentSubject(this, configuration));
  }

  has(type: Type | TypeRef): boolean {
    return this.hasOwn(type) || this.parent?.has(type) || false;
  }

  hasOwn(type: Type | TypeRef): boolean {
    return this.subjects.some(subject => subject.provides(type));
  }

  get<T extends object>(type: Type<T> | TypeRef<T>): Observable<T> {
    for (const subject of this.subjects) {
      if (subject.provides(type)) {
        return subject as unknown as Observable<T>;
      }
    }

    for (const dependency of this.dependencies) {
      if (dependency.has(type)) {
        return dependency.get(type);
      }
    }

    if (this.parent && this.parent.has(type)) {
      return this.parent.get(type);
    }

    return throwError(new NoSuchComponentException(`Instance of ${type.name} is not found in factory hierarchy`));
  }

  getAll<T extends object>(type: Type<T> | TypeRef<T>): Observable<ReadonlyArray<T>> {
    const subjects = this.subjects.filter(subject => subject.provides(type));
    const subjects$ = subjects.length === 0 ? new BehaviorSubject([]) : combineLatest(subjects);

    return subjects$.pipe(
      switchMap(instances => {
        if (this.parent) {
          return this.parent.getAll(type).pipe(
            map(_instances => [...instances, ..._instances])
          );
        }

        return new BehaviorSubject(instances);
      })
    ) as any;
  }

  getMany(types: ReadonlyArray<Type | TypeRef>): Observable<ReadonlyArray<object>> {
    return types.length > 0 ? combineLatest(types.map(type => this.get(type))) : new BehaviorSubject([]);
  }

  instantiate<T extends object>(type: Type<T>): Observable<T> {
    const deps = Class.of(type).ctor.parameters.map(parameter => parameter.type);
    let instance$ = this.getMany(deps).pipe(map(args => new type(...args)));

    if (!this.getExtensionTypes().includes(type)) {
      return this.getExtensions().pipe(
        mergeMap(extensions => {
          for (const extension of extensions) {
            instance$ = extension.apply(instance$) as any;
          }

          return instance$;
        })
      );
    }

    return instance$;
  }

  destroy(instance: object): Observable<any> {
    return this.getExtensions().pipe(
      map(extensions => [...extensions].reduceRight((instance$, extension) => extension.destroy(instance$), of(instance)))
    );
  }

  getExtensions(): Observable<ReadonlyArray<ComponentExtensionInterface>> {
    const extensions = this.getExtensionTypes();

    return this.getMany(extensions) as any;
  }

  private getExtensionTypes(): ReadonlyArray<Type<ComponentExtensionInterface> | TypeRef<ComponentExtensionInterface>> {
    const types: Array<Type<ComponentExtensionInterface> | TypeRef<ComponentExtensionInterface>> = [];
    let factory: HierarchicalComponentFactory | undefined = this;

    while (factory) {
      types.push(...factory.extensions);

      factory = factory.parent;
    }

    return types;
  }
}

export interface FactoryComponent<T extends object = object> {
  create(): Observable<T>;
}

export interface ClassComponentConfiguration<T extends object = object> {
  provide: Type<T> | TypeRef<T>;
  useClass: Type<T>;
  singleton?: boolean;
}

export interface DelegateComponentConfiguration<T extends object = object> {
  provide: Type<T> | TypeRef<T>;
  useDelegate: Delegate<ReadonlyArray<object>, Observable<T>>;
  deps?: ReadonlyArray<Type | TypeRef>;
  singleton?: boolean;
}

export interface FactoryComponentConfiguration<T extends object = object> {
  provide: Type<T> | TypeRef<T>;
  useFactory: Type<FactoryComponent<T>> | TypeRef<FactoryComponent<T>>;
  singleton?: boolean;
}

export interface ExistingComponentConfiguration<T extends object = object> {
  provide: Type<T> | TypeRef<T>;
  useExisting: Type<T> | TypeRef<T>;
  singleton?: boolean;
}

export type ComponentConfiguration<T extends object = object> =
  ClassComponentConfiguration<T>
  | DelegateComponentConfiguration<T>
  | FactoryComponentConfiguration<T>
  | ExistingComponentConfiguration<T>;

export interface ComponentSubject<T extends object = object> extends Observable<T> {
  readonly isSingleton: boolean;

  provides(type: Type | TypeRef): boolean;
}

export class GeneralComponentSubject<T extends object = object> extends Observable<T> implements ComponentSubject<T> {
  private readonly subject: ComponentSubject<T>;

  get isSingleton(): boolean {
    return this.subject.isSingleton;
  }

  constructor(factory: ComponentSubjectFactory, configuration: ComponentConfiguration<T>) {
    let subject: ComponentSubject<T>;

    if ('useClass' in configuration) {
      subject = new ClassComponentSubject(factory, configuration);
    } else if ('useFactory' in configuration) {
      subject = new FactoryComponentSubject(factory, configuration);
    } else if ('useDelegate' in configuration) {
      subject = new DelegateComponentSubject(factory, configuration);
    } else if ('useExisting' in configuration) {
      subject = new ExistingComponentSubject(factory, configuration);
    } else {
      throw new ComponentDefinitionException(`Invalid component configuration`);
    }

    super(subscriber => subject.subscribe(subscriber));

    this.subject = subject;
  }

  provides(type: Type | TypeRef): boolean {
    return this.subject.provides(type);
  }
}

export abstract class AbstractComponentSubject<T extends object = object> extends Observable<T> implements ComponentSubject<T> {
  private readonly provide: Type<T> | TypeRef<T>;
  protected readonly factory: ComponentSubjectFactory;

  readonly isSingleton: boolean;

  protected constructor(factory: ComponentSubjectFactory, provide: Type<T> | TypeRef<T>, isSingleton = true) {
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
              factory.destroy(instance).pipe(
                tap(() => console.log('-', provide.name, 'has been destroyed', '\n'))
              ).subscribe();
            }
          } else {
            console.log('-', provide.name, 'destroying prototype');
            factory.destroy(instance).pipe(
              tap(() => console.log('-', provide.name, 'has been destroyed', '\n'))
            ).subscribe();
          }
        }
      });
    });

    this.provide = provide;
    this.isSingleton = isSingleton;
    this.factory = factory;
  }

  provides(type: Type | TypeRef): boolean {
    return this.provide === type;
  }

  protected abstract instantiate(): Observable<T>;
}

export class ClassComponentSubject<T extends object = object> extends AbstractComponentSubject<T> {
  private readonly useClass: Type<T>;

  constructor(factory: ComponentSubjectFactory, { provide, useClass, singleton = true }: ClassComponentConfiguration<T>) {
    super(factory, provide, singleton);
    this.useClass = useClass;
  }

  protected instantiate(): Observable<T> {
    return this.factory.instantiate(this.useClass);
  }
}

export class DelegateComponentSubject<T extends object = object> extends AbstractComponentSubject<T> {
  private readonly useDelegate: Delegate<ReadonlyArray<object>, Observable<T>>;
  private readonly deps: ReadonlyArray<Type | TypeRef>;

  constructor(factory: ComponentSubjectFactory, { provide, useDelegate, singleton = true, deps = [] }: DelegateComponentConfiguration<T>) {
    super(factory, provide, singleton);
    this.useDelegate = useDelegate;
    this.deps = deps;
  }

  protected instantiate(): Observable<T> {
    const deps$ = this.deps.length === 0 ? new BehaviorSubject([]) : combineLatest(this.deps.map(dep => this.factory.get(dep)));

    return deps$.pipe(switchMap(args => this.useDelegate(...args)));
  }
}

export class FactoryComponentSubject<T extends object = object> extends AbstractComponentSubject<T> {
  private readonly useFactory: Type<FactoryComponent<T>> | TypeRef<FactoryComponent<T>>;

  constructor(factory: ComponentSubjectFactory, { provide, useFactory, singleton = true }: FactoryComponentConfiguration<T>) {
    super(factory, provide, singleton);
    this.useFactory = useFactory;
  }

  protected instantiate(): Observable<T> {
    return this.factory.get(this.useFactory).pipe(switchMap(factory => factory.create()));
  }
}

export class ExistingComponentSubject<T extends object = object> extends AbstractComponentSubject<T> {
  private readonly useExisting: Type<T> | TypeRef<T>;

  constructor(
    factory: ComponentSubjectFactory,
    { provide, useExisting, singleton = true }: ExistingComponentConfiguration<T>
  ) {
    super(factory, provide, singleton);
    this.useExisting = useExisting;
  }

  protected instantiate(): Observable<T> {
    return this.factory.get(this.useExisting);
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
    return of(new Cache());
  }
}

@Injectable()
class Logger implements Disposable {
  static n = 0;
  readonly n: number;

  constructor(
    private cache: Cache
  ) {
    this.n = Logger.n++;
  }

  dispose(): void {
    console.warn('Disposed', this);
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

@ComponentExtension()
export class DisposableComponentExtension implements ComponentExtensionInterface<Disposable> {
  apply(source: Observable<Disposable>): Observable<Disposable> {
    console.log('DisposableComponentExtension.extend');

    return source;
  }

  destroy(source: Observable<Disposable>): Observable<Disposable> {
    console.log('DisposableComponentExtension.destroy');

    return source.pipe(
      tap(disposable => {
        if (typeof disposable.dispose === 'function') {
          disposable.dispose();
        }
      })
    );
  }
}

// Factory --------------------------------------------------------------------

const rootFactory = new DefaultComponentFactory([
  { provide: DisposableComponentExtension, useClass: DisposableComponentExtension }
], [], [DisposableComponentExtension]);

const cacheFactory = new DefaultComponentFactory([
  { provide: CacheFactory, useClass: CacheFactory },
  { provide: Cache, useFactory: CacheFactory, singleton: false }
], [], [], rootFactory);

const loggerFactory = new DefaultComponentFactory([
  { provide: Logger, useClass: Logger, singleton: false }
], [cacheFactory], [], rootFactory);

const servicesFactory = new DefaultComponentFactory([
  { provide: LoginHandler, useClass: LoginHandler },
  { provide: UserService, useClass: UserService },
  { provide: AuthService, useClass: AuthService }
], [cacheFactory, loggerFactory], [], rootFactory);

const applicationFactory = new DefaultComponentFactory([
  { provide: Application, useClass: Application }
], [cacheFactory, loggerFactory, servicesFactory], [], rootFactory);

const subscription = applicationFactory.get(Application).subscribe({
  next: application => {
    console.log('\n');
    console.log(application);
    console.log('\n');

    setTimeout(() => {
      console.log('TERMINATE');
      console.log('\n');
      subscription.unsubscribe();
    }, 1000);
  },
  complete: () => {
    console.log('COMPLETE');
  }
});
