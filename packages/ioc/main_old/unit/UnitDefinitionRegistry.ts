import {MapIteratorFunction} from '../../../collections/main/MapIteratorFunction';
import {ReadOnlyCollection} from '../../../collections/main/ReadOnlyCollection';
import {ReadOnlyMap} from '../../../collections/main/ReadOnlyMap';
import {UnitDefinition} from './UnitDefinition';


/**
 * Interface for registries that hold unit definitions
 * Typically implemented by UnitFactories that internally work with the AbstractUnitDefinition hierarchy.
 * This is the only interface in Spring's unit factory packages that encapsulates registration of unit definitions.
 * The standard UnitFactory interfaces only cover access to a fully configured factory instance.
 *
 * Spring's unit definition readers expect to work on an implementation of this interface.
 * Known implementors within the Spring core are DefaultListableUnitFactory and GenericApplicationContext.
 */
export interface UnitDefinitionRegistry {
    readonly unitDefinitionNames: ReadOnlyCollection<string>;
    readonly unitDefinitionCount: number;

    containsUnitDefinition(unitName: string): boolean;

    /**
     * @throws {NoSuchUnitDefinitionException} if unit definition not found
     */
    getUnitDefinition(unitName: string): UnitDefinition;

    isUnitNameInUse(unitName: string): boolean;

    findUnitDefinition(filter: MapIteratorFunction<string, UnitDefinition, boolean>): UnitDefinition | undefined;

    findUnitDefinitions(filter: MapIteratorFunction<string, UnitDefinition, boolean>): ReadOnlyMap<string, UnitDefinition>;

    /**
     * @throws {NoSuchUnitDefinitionException} if unit definition not found
     */
    registerUnitDefinition(unitName: string, unitDefinition: UnitDefinition): void;

    /**
     * @throws {NoSuchUnitDefinitionException} if unit definition not found
     */
    removeUnitDefinition(unitName: string): void;
}
