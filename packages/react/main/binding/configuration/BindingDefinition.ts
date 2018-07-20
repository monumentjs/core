import {BindingConfiguration} from './BindingConfiguration';


export interface BindingDefinition<T> extends BindingConfiguration<T> {
    readonly key: string | symbol;
}
