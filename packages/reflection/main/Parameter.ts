import {Type} from '@monument/core/main/Type';
import {DefaultAccessibleObject} from './DefaultAccessibleObject';


export class Parameter extends DefaultAccessibleObject {
    private readonly _type: Type<any> | undefined;
    private readonly _index: number;

    public get index(): number {
        return this._index;
    }


    public get type(): Type<any> | undefined {
        return this._type;
    }


    public constructor(index: number, value: Type<any> | undefined) {
        super();

        this._index = index;
        this._type = value;
    }
}
