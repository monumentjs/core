import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {PropertyValidationException} from './PropertyValidationException';


export interface PropertyValidationState {
    readonly isValid: boolean;
    readonly validationErrors: ReadOnlyList<PropertyValidationException>;
}
