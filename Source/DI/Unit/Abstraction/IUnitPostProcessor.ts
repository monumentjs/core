import {UnitDefinition} from '../UnitDefinition';


export interface IUnitPostProcessor {
    /**
     * Apply this IUnitPostProcessor to the given new unit instance before any unit initialization callbacks
     * (like IInitializingUnit's afterPropertiesSet or a custom init-method).
     * The unit will already be populated with property values.
     * The returned unit instance may be a wrapper around the original.
     */
    postProcessBeforeInitialization<T>(instance: T, unitDefinition: UnitDefinition<T>): T;

    /**
     * Apply this IUnitPostProcessor to the given new unit instance after any unit initialization callbacks
     * (like IInitializingUnit's afterPropertiesSet or a custom init-method).
     * The unit will already be populated with property values.
     * The returned unit instance may be a wrapper around the original.
     * This callback will also be invoked after a short-circuiting triggered by a
     * IInstantiationAwareUnitPostProcessor.postProcessBeforeInstantiation(Type, string) method,
     * in contrast to all other IUnitPostProcessor callbacks.
     */
    postProcessAfterInitialization<T>(instance: T, unitDefinition: UnitDefinition<T>): T;
}
