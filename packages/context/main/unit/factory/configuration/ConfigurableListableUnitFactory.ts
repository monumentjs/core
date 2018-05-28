import {ConfigurableUnitFactory} from './ConfigurableUnitFactory';


export interface ConfigurableListableUnitFactory extends ConfigurableUnitFactory {

    /**
     * Ensure that all non-lazy-init singletons are instantiated.
     */
    preInstantiateSingletons(): Promise<void>;
}
