import {Type} from '@monument/core/main/Type';
import {UnitFactoryException} from './UnitFactoryException';


/**
 * Exception thrown when a UnitFactory is asked for a unit instance for which it cannot find a definition.
 * This may point to a non-existing unit, a non-unique unit,
 * or a manually registered singleton instance without an associated unit definition.
 */
export class NoSuchUnitDefinitionException extends UnitFactoryException {
    public constructor(typeOrName: Type | string, message?: string) {
        if (typeof typeOrName === 'string') {
            super(`Cannot find definition for unit with name "${typeOrName}".${message ? ' ' + message : ''}`);
        } else {
            super(`Cannot find definition for unit of type "${typeOrName.name}".${message ? ' ' + message : ''}`);
        }
    }
}
