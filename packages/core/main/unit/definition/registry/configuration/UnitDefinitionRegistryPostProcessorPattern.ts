import {ObjectPattern} from '../../../../language/ObjectPattern';
import {MethodPattern} from '../../../../language/MethodPattern';
import {UnitDefinitionRegistryPostProcessor} from './UnitDefinitionRegistryPostProcessor';
import {Singleton} from '../../../../stereotype/Singleton';

@Singleton
export class UnitDefinitionRegistryPostProcessorPattern extends ObjectPattern {
    private static _instance: UnitDefinitionRegistryPostProcessorPattern | undefined;

    public static get(): UnitDefinitionRegistryPostProcessorPattern {
        if (this._instance == null) {
            this._instance = new UnitDefinitionRegistryPostProcessorPattern();
        }

        return this._instance;
    }

    private constructor() {
        super([], [
            new MethodPattern(UnitDefinitionRegistryPostProcessor.postProcessUnitDefinitionRegistry)
        ]);
    }
}
