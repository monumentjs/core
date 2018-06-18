import {ConfigurableUnitFactory} from './ConfigurableUnitFactory';


export interface UnitFactoryPostProcessor {
    /**
     * Modify the context's internal unit factory after its standard initialization.
     * All unit definitions will have been loaded, but no units will have been instantiated yet.
     * This allows for overriding or adding properties even to eager-initializing beans.
     *
     * @throws {UnitException}
     */
    postProcessUnitFactory(factory: ConfigurableUnitFactory): Promise<void>;
}
