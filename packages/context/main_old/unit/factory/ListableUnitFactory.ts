import {UnitFactory} from './UnitFactory';
import {ReadOnlySet} from '../../../../collections/main/ReadOnlySet';
import {Class} from '@monument/reflection/main/Class';


/**
 * Extension of the UnitFactory interface to be implemented by unit factories that can enumerate
 * all their unit instances, rather than attempting unit lookup by name one by one as requested by clients.
 * UnitFactory implementations that preload all their unit definitions (such as XML-based factories)
 * may implement this interface. If this is a HierarchicalUnitFactory,
 * the return values will not take any UnitFactory hierarchy into account,
 * but will relate only to the units defined in the current factory.
 * Use the UnitFactoryUtils helper class to consider units in ancestor factories too.
 *
 * The methods in this interface will just respect unit definitions of this factory.
 * They will ignore any singleton units that have been registered by other means like ConfigurableUnitFactory's
 * registerSingleton method, with the exception of getUnitNamesOfType and getUnitsOfType which will check
 * such manually registered singletons too.
 * Of course, UnitFactory's getUnit does allow transparent access to such special units as well.
 * However, in typical scenarios, all units will be defined by external unit definitions anyway,
 * so most applications don't need to worry about this differentiation.
 *
 * NOTE: With the exception of getUnitDefinitionCount and containsUnitDefinition,
 * the methods in this interface are not designed for frequent invocation.
 * Implementations may be slow.
 */
export interface ListableUnitFactory extends UnitFactory {
    readonly unitDefinitionCount: number;
    readonly unitDefinitionNames: ReadOnlySet<string>;
    containsUnitDefinition(unitName: string): boolean;
    getUnitNamesOfType(type: Class): ReadOnlySet<string>;
}
