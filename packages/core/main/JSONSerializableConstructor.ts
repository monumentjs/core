import {Type} from './Type';
import {JSONSerializable} from './JSONSerializable';


export interface JSONSerializableConstructor<TOrigin, TJson> extends Type<JSONSerializable<TJson>> {
    fromJSON(json: TJson): TOrigin;
}
