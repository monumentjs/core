import {Type} from '@monument/core';
import {ClassLoaderException} from './ClassLoaderException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class ClassLoader {

    public async load<T>(filePath: string, className: string): Promise<Type<T>> {
        let exports: any;

        try {
            exports = await import(filePath);
        } catch (e) {
            throw new ClassLoaderException(`Class "${className}" cannot be imported from "${filePath}".`, e);
        }

        const constructor = exports[className];

        if (typeof constructor !== 'function') {
            throw new ClassLoaderException(`Class "${className}" not found in "${filePath}".`);
        }

        return constructor;
    }
}
