import {NotifyPropertyChanged} from '@monument/core/main/observable/NotifyPropertyChanged';
import {Property} from './property/Property';


export interface PortletCore extends NotifyPropertyChanged<Property<any>> {
    // readonly portletDestroyed: Event<PortletCore, EventArgs>;

    render(): JSX.Element;
}
