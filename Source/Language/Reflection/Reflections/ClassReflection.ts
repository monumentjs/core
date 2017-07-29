import {ReflectionBase} from './ReflectionBase';
import {Constructor} from '../../../types';


export class ClassReflection<T> extends ReflectionBase<Constructor<T>> {
    public static readonly symbol: symbol = Symbol.for('ClassMetadata');


    public get name(): string {
        return this.entity.name;
    }


    public get classConstructor(): Constructor<T> {
        return this.entity;
    }


    public constructor(entity: Constructor<T>) {
        super(entity, ClassReflection.symbol);
    }
}
