import {Value} from '@monument/core/main/observable/Value';
import {Binding} from '@monument/react/main/binding/configuration/decorators/Binding';
import {Component} from '@monument/react/main/component/Component';


export interface TextAttributes {
    readonly valueBinding: Value<string>;
}


export class Text extends Component<TextAttributes> {
    @Binding
    public readonly value!: string;


    public render() {
        return this.value;
    }
}
