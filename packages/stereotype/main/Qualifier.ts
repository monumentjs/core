import {QualifierConfiguration} from './QualifierConfiguration';
import {QualifierDecorator} from './QualifierDecorator';


export function Qualifier(qualifier: string): MethodDecorator {
    return function (...args: any[]) {
        new QualifierDecorator(new QualifierConfiguration(qualifier)).apply(args);
    };
}
