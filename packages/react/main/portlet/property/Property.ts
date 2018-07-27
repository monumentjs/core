import {Value} from 'packages/core/main/observable/Value';
import {PropertyValidationState} from './validation/PropertyValidationState';


export interface Property<T> extends PropertyValidationState, Value<T> {

}
