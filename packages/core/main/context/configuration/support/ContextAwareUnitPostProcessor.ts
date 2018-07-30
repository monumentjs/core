import {Type} from '../../../Type';
import {Class} from '../../../reflection/Class';
import {Method} from '../../../reflection/Method';
import {Context} from '../../Context';
import {ContextAware} from '../ContextAware';
import {ContextAwarePattern} from '../ContextAwarePattern';
import {UnitPostProcessor} from '../../../unit/factory/configuration/UnitPostProcessor';


export class ContextAwareUnitPostProcessor implements UnitPostProcessor {
    private readonly _context: Context;


    public constructor(context: Context) {
        this._context = context;
    }


    public async [UnitPostProcessor.postProcessBeforeInitialization]<T extends object>(instance: T, unitType: Type<T>): Promise<T> {
        const klass: Class<object> = Class.of(unitType);

        if (ContextAwarePattern.get().test(instance)) {
            const method: Method = klass.getMethod(ContextAware.setContext);

            await method.invoke(instance, [this._context]);
        }

        return instance;
    }


    public async [UnitPostProcessor.postProcessAfterInitialization]<T extends object>(instance: T): Promise<T> {
        return instance;
    }
}
