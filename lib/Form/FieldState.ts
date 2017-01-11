import Store from '../Core/Store';
import {IFieldState, IFieldAction, FieldActionType, IFieldProps} from './types';
import ValidationError from '../Core/Data/Validation/ValidationError';
import {ValidationRules} from '../Core/Data/Validation/types';
import IDGenerator from '../Core/Data/Generation/IDGenerator';
import debounce from '../Core/Language/Decorators/Method/Debounce';


const ID_GENERATOR: IDGenerator = new IDGenerator();


export default class FieldState extends Store<IFieldState, IFieldAction> {
    private _name: string;
    private _rules: ValidationRules;
    private _id: number = ID_GENERATOR.generate();


    get id(): number {
        return this._id;
    }


    get value(): any {
        return this.state.value;
    }


    get name(): string {
        return this._name;
    }


    get rules(): ValidationRules {
        return this._rules;
    }


    get dirty(): boolean {
        return this.state.dirty;
    }


    get touched(): boolean {
        return this.state.touched;
    }


    get invalid(): boolean {
        return this.state.errors.length > 0;
    }


    get errors(): ValidationError[] {
        return this.state.errors;
    }


    constructor(props: IFieldProps) {
        super({
            dirty: false,
            touched: false,
            invalid: false,
            errors: [],
            value: undefined
        });

        this._name = props.name || '';
        this._rules = props.rules;

        this.initialize();
    }


    public touch() {
        this.dispatch({
            type: FieldActionType.Touched
        });
    }


    public setValue(value: any) {
        this.dispatch({
            type: FieldActionType.Changed,
            value: value
        });
    }


    public setValidity(errors: ValidationError[]) {
        this.dispatch({
            type: FieldActionType.Validated,
            errors: errors
        });
    }


    protected initialize() {
        this.addReducers(function (state: IFieldState, action: IFieldAction): IFieldState {
            switch (action.type) {
                case FieldActionType.Touched:
                    state.touched = true;
                    break;

                case FieldActionType.Changed:
                    state.value = action.value;
                    state.dirty = true;
                    state.touched = true;
                    break;

                case FieldActionType.Validated:
                    state.errors = action.errors;
                    state.invalid = action.errors.length > 0;
                    break;
            }

            return state;
        });
    }
}
