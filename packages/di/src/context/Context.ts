import { Observable } from 'rxjs';
import { Type } from '@monument/core';
import { Lifecycle } from '../lifecycle/Lifecycle';

export interface ComponentDefinition {
  readonly type: Type;
  readonly description?: string;
}

export interface ComponentExtension<T extends object = object> {
  extend(source: Observable<T>): Observable<T>;
}

/**
 * Component factory implementations should support the standard component lifecycle interfaces as far as possible. The full set of initialization methods and their standard order is:
 * 1. ComponentNameAware's setComponentName
 * 2. ComponentClassLoaderAware's setComponentClassLoader
 * 3. ComponentFactoryAware's setComponentFactory
 * 4. ResourceLoaderAware's setResourceLoader (only applicable when running in an application context)
 * 5. ApplicationEventPublisherAware's setApplicationEventPublisher (only applicable when running in an application context)
 * 6. MessageSourceAware's setMessageSource (only applicable when running in an application context)
 * 7. ApplicationContextAware's setApplicationContext (only applicable when running in an application context)
 * 8. ServletContextAware's setServletContext (only applicable when running in a web application context)
 * 9. postProcessBeforeInitialization methods of ComponentPostProcessors
 * 10. InitializingComponent's afterPropertiesSet
 * 11. a custom init-method definition
 * 12. postProcessAfterInitialization methods of ComponentPostProcessors
 *
 * On shutdown of a component factory, the following lifecycle methods apply:
 * 1. DisposableComponent's destroy
 * 2. a custom destroy-method definition
 */
export interface ComponentFactory {
  has(type: Type): boolean;

  get<T extends object>(type: Type<T>): Observable<T> | undefined;

  getAll<T extends object>(type: Type<T>): Observable<Readonly<T>>;

  getAliases(type: Type): ReadonlyArray<string>;

  isPrototype(type: Type): boolean;

  isSingleton(type: Type): boolean;
}

export interface HierarchicalComponentFactory extends ComponentFactory {
  readonly parentFactory?: ComponentFactory;

  hasOwn(type: Type): boolean;
}

export interface ListableComponentFactory extends ComponentFactory {
  find(): Observable<ReadonlyArray<object>>;
}

export interface ConfigurableComponentFactory extends HierarchicalComponentFactory {
  parentFactory?: ComponentFactory;

  readonly componentPostProcessorCount: number;

  addComponentExtension(extension: ComponentExtension): void;

  /**
   * Copy all relevant configuration from the given other factory.
   * Should include all standard configuration settings as well as ComponentPostProcessors, Scopes, and factory-specific internal settings.
   * Should not include any metadata of actual component definitions, such as ComponentDefinition objects and component name aliases.
   */
  copyConfigurationFrom(factory: ConfigurableComponentFactory): void;

  /**
   * Destroy the given component instance (usually a prototype instance obtained from this factory) according to its component definition.
   * Any exception that arises during destruction should be caught and logged instead of propagated to the caller of this method.
   */
  destroy(instance: object): void;

  /**
   * Destroy all singleton beans in this factory, including inner beans that have been registered as disposable.
   * Any exception that arises during destruction should be caught and logged instead of propagated to the caller of this method.
   */
  destroySingletons(): void;

  /**
   * Return a merged ComponentDefinition for the given bean name, merging a child bean definition with its parent if necessary.
   */
  getMergedComponentDefinition(type: Type): ComponentDefinition;

  registerDependentComponent(type: Type, dependent: Type): void;
}

export interface Context extends Lifecycle {
  readonly parent?: Context;
  readonly name: string;

  get<T extends object>(type: Type<T>, onlySelf?: boolean, skipSelf?: boolean): Observable<T> | undefined;
}
