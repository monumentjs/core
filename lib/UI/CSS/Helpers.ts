import _merge = require('lodash/merge');


export function mergeStyles(...styles: CSSStyleDeclaration[]): CSSStyleDeclaration {
    return _merge({}, ...styles) as CSSStyleDeclaration;
}
