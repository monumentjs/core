import {Assert} from '@monument/core/Assertion/Assert';
import {Equatable} from '@monument/core/main/Equatable';
import {NullSafeEqualityComparator} from '../../../../core/main/NullSafeEqualityComparator';


export class HttpCookie implements Equatable<HttpCookie> {
    private _name: string;
    private _value: string;


    public get name(): string {
        return this._name;
    }


    public get value(): string {
        return this._value;
    }


    public constructor(name: string, value: string) {
        Assert.argument('name', name).notEmptyString();

        this._name = name;
        this._value = value;
    }


    public toString(): string {
        return `${this.name}=${this.value}`;
    }


    public equals(other: HttpCookie): boolean {
        if (this === other) {
            return true;
        }

        return (
            NullSafeEqualityComparator.instance.equals(this.name, other.name) &&
            NullSafeEqualityComparator.instance.equals(this.value, other.value)
        );
    }
}
