import {Type} from '../Type';
import {DefaultAccessibleObject} from './DefaultAccessibleObject';


export class Parameter extends DefaultAccessibleObject {
    private readonly _type: Type<any> | undefined;
    private readonly _isOptional: boolean;

    public get isOptional(): boolean {
        return this._isOptional;
    }


    public get type(): Type<any> | undefined {
        return this._type;
    }


    public constructor(value: Type<any> | undefined, isOptional: boolean) {
        super();

        this._type = value;
        this._isOptional = isOptional;
    }
}
