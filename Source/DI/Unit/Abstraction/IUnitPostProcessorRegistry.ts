import {IUnitPostProcessor} from './IUnitPostProcessor';
import {Type} from '../../../Core/Types/Type';


export interface IUnitPostProcessorRegistry {
    readonly unitPostProcessorsCount: number;
    registerUnitPostProcessor(postProcessor: Type<IUnitPostProcessor>): void;
}
