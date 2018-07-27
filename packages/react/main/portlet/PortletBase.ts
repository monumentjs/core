import {PortletCore} from './PortletCore';
import {PropertyManager} from './property/PropertyManager';
import {Disposable} from '@monument/core/main/Disposable';
import {PropertyConfiguration} from './property/configuration/PropertyConfiguration';
import {Property} from './property/Property';
import {PropertyChangedEventArgs} from '@monument/core/main/observable/PropertyChangedEventArgs';
import {Event} from '@monument/core/main/events/Event';


export abstract class PortletBase implements PortletCore, Disposable {
    // private readonly _portletDestroyed: ConfigurableEvent<this, EventArgs> = new ConfigurableEvent();
    private readonly _propertyManager: PropertyManager = new PropertyManager();

    // public get portletDestroyed(): Event<this, EventArgs> {
    //     return this._portletDestroyed;
    // }

    public get propertyChanged(): Event<Property<any>, PropertyChangedEventArgs> {
        return this._propertyManager.propertyChanged;
    }

    public abstract render(): JSX.Element;

    public async dispose(): Promise<void> {
        this._propertyManager.dispose();
        // this._portletDestroyed.trigger(this, new EventArgs());
        // this._portletDestroyed.dispose();
    }

    protected getProperty<T>(initialValue: T, configuration: PropertyConfiguration<T> = PropertyConfiguration.DEFAULT): Property<T> {
        return this._propertyManager.getProperty(initialValue, configuration);
    }
}
