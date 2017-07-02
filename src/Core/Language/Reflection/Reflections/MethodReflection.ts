import {ReflectionBase} from './ReflectionBase';


const METHOD_METADATA_CONTAINER_KEY: string = '__method_metadata__';


export class MethodReflection extends ReflectionBase<Function> {

    public get name(): string {
        return this.entity.name;
    }


    public get method(): Function {
        return this.entity;
    }


    public constructor(method: Function) {
        super(method, METHOD_METADATA_CONTAINER_KEY);
    }
}
