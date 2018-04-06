import {Type} from '../Type';


export function GetInstance(...args: any[]): PropertyDecorator {
    return function () {
        const type: Function = arguments[0];
        const key: PropertyKey = arguments[1];
        const valueKey: symbol = Symbol();

        Object.defineProperty(type, key, {
            get: function (this: any) {
                if (!this.hasOwnProperty(valueKey)) {
                    this[valueKey] = new (type as Type<any>)(...args);
                }

                return this[valueKey];
            }
        });
    };
}
