import {Type} from '../../../Core/Types/Type';


export interface IUnitFactory {
    getUnit<T>(type: Type<T>): T;
}
