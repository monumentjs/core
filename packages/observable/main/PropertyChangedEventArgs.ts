import {EventArgs} from '@monument/events/main/EventArgs';


export class PropertyChangedEventArgs extends EventArgs {
    private readonly _propertyName: PropertyKey;


    public get propertyName(): PropertyKey {
        return this._propertyName;
    }


    public constructor(propertyName: PropertyKey) {
        super();

        this._propertyName = propertyName;
    }
}
