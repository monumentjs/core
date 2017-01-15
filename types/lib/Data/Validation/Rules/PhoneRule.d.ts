import { ValidationResult } from '../types';
import PatternRule from './PatternRule';
export default class PhoneRule extends PatternRule {
    validate(model: any, property: string): ValidationResult;
}
