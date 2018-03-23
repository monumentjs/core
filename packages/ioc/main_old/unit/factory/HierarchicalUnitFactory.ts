import {UnitFactory} from './UnitFactory';


export interface HierarchicalUnitFactory extends UnitFactory {
    readonly parentUnitFactory: UnitFactory | undefined;

    /**
     * Return whether the local unit factory contains a unit of the given name,
     * ignoring units defined in ancestor contexts.
     * This is an alternative to containsUnit, ignoring a unit of the given name from an ancestor unit factory.
     */
    containsLocalUnit(unitName: string): boolean;
}
