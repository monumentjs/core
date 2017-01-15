import { ValidationResult } from '../types';
import PatternRule from './PatternRule';
export default class EmailRule extends PatternRule {
    constructor();
    validate(model: any, property: string): ValidationResult;
}
