import {ReadOnlyCollection, ReadOnlyMultiValueMap, ToString} from '@monument/core';

/**
 * @since 0.0.1
 * @author Alex Chugaev
 */
export interface ReadOnlyQueryParameters extends ReadOnlyMultiValueMap<string, ToString> {
    getBoolean(key: string): boolean | undefined;

    getBoolean(key: string, defaultValue: boolean): boolean;

    getFloat(key: string): number | undefined;

    getFloat(key: string, defaultValue: number): number;

    getFloats(key: string): ReadOnlyCollection<number>;

    getInteger(key: string): number | undefined;

    getInteger(key: string, defaultValue: number): number;

    getIntegers(key: string): ReadOnlyCollection<number>;

    getString(key: string): string | undefined;

    getString(key: string, defaultValue: string): string;

    getStrings(key: string): ReadOnlyCollection<string>;
}
