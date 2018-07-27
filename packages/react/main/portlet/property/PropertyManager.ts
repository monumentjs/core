import {Disposable} from 'packages/core/main/Disposable';
import {ArrayList} from 'packages/core/main/collection/mutable/ArrayList';
import {PropertyFactory} from './factory/PropertyFactory';
import {PropertyConfiguration} from './configuration/PropertyConfiguration';
import {DefaultProperty} from './support/DefaultProperty';
import {Property} from './Property';
import {ConfigurableEvent} from 'packages/core/main/events/ConfigurableEvent';
import {Event} from 'packages/core/main/events/Event';
import {NotifyPropertyChanged} from 'packages/core/main/observable/NotifyPropertyChanged';
import {PropertyChangedEventArgs} from 'packages/core/main/observable/PropertyChangedEventArgs';


export class PropertyManager implements PropertyFactory, NotifyPropertyChanged<Property<any>>, Disposable {
    private readonly _propertyChanged: ConfigurableEvent<Property<any>, PropertyChangedEventArgs> = new ConfigurableEvent();
    private readonly _properties: ArrayList<DefaultProperty<any>> = new ArrayList();

    public get propertyChanged(): Event<Property<any>, PropertyChangedEventArgs> {
        return this._propertyChanged;
    }

    public dispose(): void {
        for (const property of this._properties) {
            property.dispose();
        }

        this._properties.clear();
    }

    public getProperty<T>(initialValue: T): Property<T>;
    public getProperty<T>(initialValue: T, configuration: PropertyConfiguration<T>): Property<T>;
    public getProperty<T>(initialValue: T, configuration: PropertyConfiguration<T> = PropertyConfiguration.DEFAULT): Property<T> {
        const property: DefaultProperty<T> = new DefaultProperty(initialValue, configuration);

        this._properties.add(property);

        property.subscribe({
            onNext: () => {
                this._propertyChanged.trigger(property, new PropertyChangedEventArgs());
            },
            onError() {/**/},
            onCompleted() {/**/}
        });

        return property;
    }
}
