import {Type} from './Type';
import {ClassLoaderException} from './ClassLoaderException';


export class ClassLoader {

    public async load<T>(filePath: string, className: string): Promise<Type<T>> {
        let exports: any;

        try {
            exports = await import(filePath);
        } catch (e) {
            throw new ClassLoaderException(`Class ${className} cannot be imported from ${filePath}`, e);
        }

        const constructor = exports[className];

        if (typeof constructor !== 'function') {
            throw new ClassLoaderException(`Class ${className} not found in ${filePath}`);
        }

        return constructor;
    }
}
