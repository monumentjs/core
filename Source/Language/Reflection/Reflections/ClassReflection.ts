import {ReflectionBase} from './ReflectionBase';


const CLASS_METADATA_CONTAINER_KEY: string = '__class_metadata__';


export class ClassReflection extends ReflectionBase<Function> {

    public get name(): string {
        return this.entity.name;
    }


    public get classConstructor(): Function {
        return this.entity;
    }


    public constructor(method: Function) {
        super(method, CLASS_METADATA_CONTAINER_KEY);
    }
}
