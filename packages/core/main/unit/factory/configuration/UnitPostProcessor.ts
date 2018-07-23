import {Type} from '../../../Type';

export interface UnitPostProcessor {

    /**
     * Apply this UnitPostProcessor to the given new unit instance before any unit initialization callbacks
     * (like InitializingUnit's afterPropertiesSet or a custom init-method).
     * The unit will already be populated with property values.
     * The returned unit instance may be a wrapper around the original.
     */
    [UnitPostProcessor.postProcessBeforeInitialization]<T extends object>(instance: T, unitType: Type<T>): Promise<T>;

    /**
     * Apply this UnitPostProcessor to the given new unit instance after any unit initialization callbacks
     * (like InitializingUnit's afterPropertiesSet or a custom init-method).
     * The unit will already be populated with property values.
     * The returned unit instance may be a wrapper around the original.
     * This callback will also be invoked after a short-circuiting triggered by a
     * InstantiationAwareUnitPostProcessor.postProcessBeforeInstantiation(Type, string) method,
     * in contrast to all other UnitPostProcessor callbacks.
     */
    [UnitPostProcessor.postProcessAfterInitialization]<T extends object>(instance: T, unitType: Type<T>): Promise<T>;
}

export namespace UnitPostProcessor {
    export const postProcessBeforeInitialization = Symbol();
    export const postProcessAfterInitialization = Symbol();
}
