import LocalizationService from '../../../Localization/LocalizationService';
import ListLengthRule from '../Rules/ListLengthRule';
import RangeRule from '../Rules/RangeRule';
import TextLengthRule from '../Rules/TextLengthRule';


LocalizationService.addResource({
    any: {

        // HELPERS

        'plural.characters': (count: number): string => {
            return `${count} character${count > 1 ? 's' : ''}`;
        },

        // MESSAGES

        // Validation exceptions

        'validation.exception.invalidRange': (model: any, property: string, rule: any): string => {
            return `Invalid range specified (${rule.min}...${rule.max}).`;
        },

        // Equality rule

        'validation.error.equality': 'Values are not match.',

        // Text rules

        'validation.error.text.required': 'Value is required.',
        'validation.error.text.patternMismatch': 'Value does not match pattern.',
        'validation.error.number.patternMismatch': 'Value is not a valid number.',
        'validation.error.email.patternMismatch': 'Value is not a valid email address.',
        'validation.error.phone.patternMismatch': 'Value is not a valid phone number.',
        'validation.error.url.patternMismatch': 'Value is not a valid URL.',
        'validation.error.text.minLength': (model: any, property: string, rule: TextLengthRule): string => {
            return `Value is too short. Minimal length is ${this['plural.characters'](rule.min)}.`;
        },
        'validation.error.text.maxLength': (model: any, property: string, rule: TextLengthRule): string => {
            return `Value is too long. Maximal length is ${this['plural.characters'](rule.max)}.`;
        },
        
        // Number rules
        
        'validation.error.number.min': (model: any, property: string, rule: RangeRule): string => {
            return `Value can't be less than ${rule.min}.`;
        },
        'validation.error.number.max': (model: any, property: string, rule: RangeRule): string => {
            return `Value can't be greater than ${rule.max}.`;
        },

        // List rules

        'validation.error.list.contains': 'One or more required values are missing.',
        'validation.error.list.minLength': (model: any, property: string, rule: ListLengthRule): string => {
            return `List is too short. Minimal length is ${rule.min}.`;
        },
        'validation.error.list.maxLength': (model: any, property: string, rule: ListLengthRule): string => {
            return `List is too long. Maximal length is ${rule.max}.`;
        },
        
        // Type checking
        
        'validation.error.type.mismatch': 'Value has incorrect type.'
    }
});
