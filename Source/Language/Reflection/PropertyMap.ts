import {Property} from './Property';
import {Map} from '../../Collections/Map';


export class PropertyMap extends Map<PropertyKey, Property> {
    public clone(): PropertyMap {
        return new PropertyMap(this);
    }
}
