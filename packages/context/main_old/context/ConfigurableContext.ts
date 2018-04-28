import {Type} from '@monument/core/main/Type';
import {Lifecycle} from '@monument/core/main/Lifecycle';
import {Context} from './Context';
import {UnitFactoryPostProcessor} from '../../unit/factory/configuration/UnitFactoryPostProcessor';
import {ConfigurableListableUnitFactory} from '../unit/factory/configuration/ConfigurableListableUnitFactory';


export interface ConfigurableContext extends Context, Lifecycle {
    parent: Context | undefined;

    /**
     * Returns the internal unit factory of this application context.
     */
    readonly unitFactory: ConfigurableListableUnitFactory;

    addUnitFactoryPostProcessor(postProcessor: UnitFactoryPostProcessor): void;

    register<T extends object>(type: Type<T>): Promise<void>;
}
