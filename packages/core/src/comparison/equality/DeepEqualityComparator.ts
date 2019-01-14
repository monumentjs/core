import {EqualityComparator} from './EqualityComparator';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class DeepEqualityComparator implements EqualityComparator<object> {
    private static _instance: DeepEqualityComparator | undefined;

    public static get(): DeepEqualityComparator {
        if (this._instance == null) {
            this._instance = new DeepEqualityComparator();
        }

        return this._instance;
    }

    private constructor() {
    }

    public equals(actual: object, expected: object): boolean {
        // 7.1. All identical values are equivalent, as determined by ===.
        if (actual === expected) {
            return true;

        } else if (actual instanceof Date && expected instanceof Date) {
            return actual.getTime() === expected.getTime();

            // 7.3. Other pairs that do not both pass typeof value == 'object',
            // equivalence is determined by ==.
        } else if (!actual || !expected || typeof actual !== 'object' && typeof expected !== 'object') {
            return actual === expected;

            // 7.4. For all other Object pairs, including Array objects, equivalence is
            // determined by having the same number of owned properties (as verified
            // with Object.prototype.hasOwnProperty.call), the same set of keys
            // (although not necessarily the same order), equivalent values for every
            // corresponding key, and an identical 'prototype' property. Note: this
            // accounts for both named and indexed properties on Arrays.
        } else {
            return this.objEquiv(actual, expected);
        }
    }

    private isArguments(obj: object): boolean {
        return Object.prototype.toString.call(obj) === '[object Arguments]';
    }

    private isBuffer(x: any): boolean {
        if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
            return false;
        }

        if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
            return false;
        }

        return !(x.length > 0 && typeof x[0] !== 'number');
    }

    private objEquiv(a: any, b: any): boolean {
        let kb: any;
        let ka: any;
        let i;
        let key;

        if (a == null || b == null) {
            return false;
        }

        // an identical 'prototype' property.

        if (a.prototype !== b.prototype) {
            return false;
        }

        // ~~~I've managed to break Object.keys through screwy arguments passing.
        //   Converting to array solves the problem.

        if (this.isArguments(a)) {
            if (!this.isArguments(b)) {
                return false;
            }

            const argsA = Array.prototype.slice.call(a);
            const argsB = Array.prototype.slice.call(b);

            return this.equals(argsA, argsB);
        }

        if (this.isBuffer(a)) {
            if (!this.isBuffer(b)) {
                return false;
            }

            if (a.length !== b.length) {
                return false;
            }

            for (i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }

            return true;
        }

        try {
            ka = Object.keys(a);
            kb = Object.keys(b);
        } catch (e) {
            // happens when one is a string literal and the other isn't
            return false;
        }

        // having the same number of owned properties (keys incorporates
        // hasOwnProperty)

        if (ka.length !== kb.length) {
            return false;
        }

        // the same set of keys (although not necessarily the same order),

        ka.sort();
        kb.sort();

        // ~~~cheap key test

        for (i = ka.length - 1; i >= 0; i--) {
            if (ka[i] !== kb[i]) {
                return false;
            }
        }

        // equivalent values for every corresponding key, and
        // ~~~possibly expensive deep test

        for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];

            if (!this.equals(a[key], b[key])) {
                return false;
            }
        }

        return typeof a === typeof b;
    }

}
