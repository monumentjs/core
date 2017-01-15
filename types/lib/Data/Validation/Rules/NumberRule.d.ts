import { ValidationResult } from '../types';
import PatternRule from './PatternRule';
export default class NumberRule extends PatternRule {
    constructor(pattern?: RegExp);
    validate(model: any, property: string): ValidationResult;
}
