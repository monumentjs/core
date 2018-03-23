import {Context} from './Context';
import {Lifecycle} from '../../main/context/Lifecycle';
import {UnitFactoryPostProcessor} from '../../unit/factory/configuration/UnitFactoryPostProcessor';
import {ConfigurableListableUnitFactory} from '../unit/factory/configuration/ConfigurableListableUnitFactory';
import {Type} from '@monument/core/main/Type';


export interface ConfigurableContext extends Context, Lifecycle {
    parent: Context | undefined;

    /**
     * Returns the internal unit factory of this application context.
     */
    readonly unitFactory: ConfigurableListableUnitFactory;

    addUnitFactoryPostProcessor(postProcessor: UnitFactoryPostProcessor): void;

    register<T extends object>(type: Type<T>): Promise<void>;
}
