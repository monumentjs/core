import {Type} from '@monument/core/main/Type';
import {DeepEqualityComparator} from '@monument/core/main/utils/DeepEqualityComparator';
import {Component} from '@monument/decorators/main/stereotype/Component';
import {AssertionException} from './AssertionException';


@Component
export class Assert {
    private readonly _deepEqualityComparator: DeepEqualityComparator<object>;


    public constructor(deepEqualityComparator: DeepEqualityComparator<object>) {
        this._deepEqualityComparator = deepEqualityComparator;

    }


    public fail(message: string): void {
        throw new AssertionException(message);
    }


    /**
     * Checks equality of actual and expected values using strict equality comparison (=== operator).
     *
     * @throws {AssertionException} if values are not equal
     */
    public equals<T>(actual: T, expected: T, message?: string): void {
        if (actual !== expected) {
            this.fail(message || `Expected value to be equal to ${expected}. Instead received ${actual}.`);
        }
    }


    /**
     * Checks equality of actual and expected values using strict equality comparison (=== operator).
     *
     * @throws {AssertionException} if values are not equal
     */
    public notEquals<T>(actual: T, expected: T, message?: string): void {
        if (actual === expected) {
            this.fail(message || `Expected value not to be equal to ${expected}. Instead received ${actual}.`);
        }
    }


    public true(condition: boolean, message?: string): void {
        this.equals(condition, true, message);
    }


    public false(condition: boolean, message?: string): void {
        this.equals(condition, false, message);
    }


    public identical<T extends object>(actual: T, expected: T, message?: string): void {
        if (!this._deepEqualityComparator.equals(actual, expected)) {
            this.fail(message || `Actual value is not identical to expected.`);
        }
    }


    public notIdentical<T extends object>(actual: T, expected: T, message?: string): void {
        if (this._deepEqualityComparator.equals(actual, expected)) {
            this.fail(message || `Actual value is identical to expected.`);
        }
    }


    public throws(fn: () => void | Promise<void>, errorType: Type<Error>): void | Promise<void> {
        try {
            const returnValue = fn();

            if (returnValue instanceof Promise) {
                return returnValue.catch((e) => {
                    if (!(e instanceof errorType)) {
                        this.fail(`Expected function to throw ${errorType.name}. Instead thrown ${e.constructor.name}: ${e.message}.`);
                    }
                });
            }
        } catch (e) {
            if (!(e instanceof errorType)) {
                this.fail(`Expected function to throw ${errorType.name}. Instead thrown ${e.constructor.name}: ${e.message}.`);
            }

            return;
        }

        this.fail(`Expected ${errorType.name} to be thrown, but no errors was thrown.`);
    }
}

