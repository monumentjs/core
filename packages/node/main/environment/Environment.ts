import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {AbstractReadOnlyMap} from '@monument/collections/main/AbstractReadOnlyMap';
import {CaseInsensitiveMap} from '@monument/collections/main/CaseInsensitiveMap';
import {KeyValuePair} from '@monument/collections/main/KeyValuePair';
import {Lazy} from '@monument/decorators/main/stereotype/configuration/Lazy';
import {Component} from '@monument/decorators/main/stereotype/Component';


@Lazy
@Component
export class Environment extends AbstractReadOnlyMap<string, string> {
    private readonly _values: CaseInsensitiveMap<string> = new CaseInsensitiveMap();


    public get isEmpty(): boolean {
        return this._values.isEmpty;
    }


    public get length(): number {
        return this._values.length;
    }


    public get keys(): ReadOnlySet<string> {
        return this._values.keys;
    }


    public get values(): ReadOnlyCollection<string> {
        return this._values.values;
    }


    protected get iterator(): Iterator<KeyValuePair<string, string>> {
        return this._values.iterator;
    }


    public constructor() {
        super();

        const env: NodeJS.ProcessEnv = process.env;

        Object.keys(env).forEach((key: string) => {
            const value: string | undefined = env[key];

            if (value != null) {
                this._values.put(key, value);
            }
        });
    }


    public containsEntry(key: string, value: string): boolean {
        return this._values.containsEntry(key, value);
    }


    public containsKey(key: string): boolean {
        return this._values.containsKey(key);
    }


    public containsValue(value: string): boolean {
        return this._values.containsValue(value);
    }


    public get(key: string, defaultValue?: string): string | undefined {
        return this._values.get(key, defaultValue);
    }

}
