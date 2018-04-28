import {Type} from '@monument/core/main/Type';


export interface UnitFactory {
    /**
     * Does this bean factory contain a bean definition or externally registered singleton
     * instance with the given name?
     */
    containsUnit(unitName: string): boolean;

    /**
     * @throws {NoSuchUnitDefinitionException} if there is no unit definition with the specified type
     * @throws {UnitFactoryException} if the unit could not be obtained
     */
    getUnitByType<T>(type: Type<T>): Promise<T>;

    /**
     * @throws {NoSuchUnitDefinitionException} if there is no unit definition with the specified name
     * @throws {UnitFactoryException} if the unit could not be obtained
     */
    getUnitByName(unitName: string): Promise<object>;

    /**
     * @throws {NoSuchUnitDefinitionException} if there is no unit definition with the specified name
     */
    getType(unitName: string): Type;

    /**
     * @throws {NoSuchUnitDefinitionException} if there is no unit definition with the specified name
     */
    isPrototype(unitName: string): boolean;

    /**
     * @throws {NoSuchUnitDefinitionException} if there is no unit definition with the specified name
     */
    isSingleton(unitName: string): boolean;

    /**
     * @throws {NoSuchUnitDefinitionException} if there is no unit definition with the specified name
     */
    isTypeMatch(unitName: string, unitType: Type): boolean;
}
