import {GetterFunction} from '../reflection/types';


export function Cached(target: object, key: string, descriptor: PropertyDescriptor): PropertyDescriptor | undefined {
    const getter: GetterFunction | undefined = descriptor.get;

    if (getter != null) {
        const prop: symbol = Symbol();

        return {
            ...descriptor,
            get: function (this: any) {
                if (!(prop in this)) {
                    this[prop] = getter.call(this);
                }

                return this[prop];
            }
        };
    }

    return undefined;
}
