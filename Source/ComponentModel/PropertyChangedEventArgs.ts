import {EventArgs} from '../Events/EventArgs';


export class PropertyChangedEventArgs extends EventArgs {
    private readonly _propertyName: string;


    public get propertyName(): string {
        return this._propertyName;
    }


    public constructor(propertyName: string) {
        super();

        this._propertyName = propertyName;
    }
}
