import {IUnitPostProcessor} from './IUnitPostProcessor';


export interface IUnitPostProcessorRegistry {
    readonly unitPostProcessorsCount: number;
    addUnitPostProcessor(postProcessor: IUnitPostProcessor): void;
}
