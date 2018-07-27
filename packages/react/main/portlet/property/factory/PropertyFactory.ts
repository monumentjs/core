import {PropertyConfiguration} from '../configuration/PropertyConfiguration';
import {Property} from '../Property';


export interface PropertyFactory {
    getProperty<T>(initialValue: T): Property<T>;
    getProperty<T>(initialValue: T, configuration: PropertyConfiguration<T>): Property<T>;
}
