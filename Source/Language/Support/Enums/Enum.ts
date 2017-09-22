import {Collection} from '../../../Collections/Collection';
import {Map} from '../../../Collections/Map';


interface IEnumDefinition {
    readonly keys: Collection<string>;
    readonly values: Collection<string | number>;
}


export class Enum {
    private static _enumDefinitions: Map<object, IEnumDefinition> = new Map();


    public static hasKey(enumObject: object, key: string): boolean {
        const definition: IEnumDefinition = this.getEnumDefinition(enumObject);

        return definition.keys.contains(key);
    }


    public static hasValue(enumObject: object, value: string | number): boolean {
        const definition: IEnumDefinition = this.getEnumDefinition(enumObject);

        return definition.values.contains(value);
    }


    private static getEnumDefinition(enumObject: object): IEnumDefinition {
        let definition: IEnumDefinition | undefined = this._enumDefinitions.get(enumObject);

        if (definition == null) {
            definition = {
                keys: new Collection(Object.keys(enumObject)),
                values: new Collection(Object.values(enumObject) as Array<string | number>),
            };

            this._enumDefinitions.put(enumObject, definition);
        }

        return definition;
    }
}
