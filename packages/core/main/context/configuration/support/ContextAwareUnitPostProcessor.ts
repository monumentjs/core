import {UnitPostProcessor} from '../../../unit/factory/configuration/UnitPostProcessor';
import {Context} from '../../Context';
import {Class} from '../../../reflection/Class';
import {Type} from '../../../Type';


export class ContextAwareUnitPostProcessor implements UnitPostProcessor {
    private readonly _context: Context;


    public constructor(context: Context) {
        this._context = context;
    }


    public async postProcessBeforeInitialization<T extends object>(instance: T, unitType: Type<T>): Promise<T> {
        const klass = Class.of(instance.constructor);

        if (klass.hasMethod('setContext')) {
            const method = klass.getMethod('setContext');

            method.invoke(instance, [this._context]);
        }

        return instance;
    }


    public async postProcessAfterInitialization<T extends object>(instance: T, unitType: Type<T>): Promise<T> {
        return instance;
    }
}
