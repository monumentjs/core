import {Type} from '@monument/core/main/Type';
import {DefaultAccessibleObject} from './DefaultAccessibleObject';


export class Parameter extends DefaultAccessibleObject {
    private readonly _type: Type<any> | undefined;


    public get type(): Type<any> | undefined {
        return this._type;
    }


    public constructor(value: Type<any> | undefined) {
        super();

        this._type = value;
    }
}
