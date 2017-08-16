import {ReflectionBase} from './ReflectionBase';
import {Constructor} from '../../types';


export class ClassReflection<T> extends ReflectionBase<Constructor<T>> {
    public static readonly METADATA_KEY: symbol = Symbol('ClassMetadata');


    public readonly name: string;
    public readonly prototype: object;
    public readonly argumentsCount: number;


    public constructor(type: Constructor<T>) {
        super(type, ClassReflection.METADATA_KEY);

        this.name = type.name;
        this.prototype = type.prototype;
        this.argumentsCount = type.length;
    }
}
