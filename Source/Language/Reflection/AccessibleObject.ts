import {AttributeAccessorSupport} from './AttributeAccessorSupport';
import {Map} from '../../Collections/Map';


export class AccessibleObject extends AttributeAccessorSupport {
    private _annotations: Map<Function, any> = new Map();


    public addAnnotation<TValue>(annotation: Function, value: TValue): TValue | undefined {
        return this._annotations.put(annotation, value);
    }


    public hasAnnotation(annotation: Function): boolean {
        return this._annotations.containsKey(annotation);
    }


    public getAnnotation<TValue>(annotation: Function): TValue | undefined {
        return this._annotations.get(annotation);
    }


    public removeAnnotation(annotation: Function): boolean {
        return this._annotations.remove(annotation);
    }


    public removeAllAnnotations(): boolean {
        return this._annotations.clear();
    }
}
