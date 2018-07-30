import {ConfigurableProperty} from '../configuration/ConfigurableProperty';
import {ObservableValue} from '@monument/core/main/observable/ObservableValue';
import {ReadOnlyList} from '@monument/core/main/collection/readonly/ReadOnlyList';
import {PropertyValidationException} from '../validation/PropertyValidationException';
import {ArrayList} from '@monument/core/main/collection/mutable/ArrayList';
import {PropertyConfiguration} from '../configuration/PropertyConfiguration';
import {Observer} from '@monument/core/main/observable/Observer';
import {Disposable} from '@monument/core/main/Disposable';
import {PropertyValidationRule} from '../validation/PropertyValidationRule';
import {Sequence} from '@monument/core/main/collection/readonly/Sequence';
import {Delegate} from '@monument/core/main/decorators/Delegate';


export class DefaultProperty<T> implements ConfigurableProperty<T> {
    private readonly _value: ObservableValue<T>;
    private readonly _validationRules: Sequence<PropertyValidationRule<T>> ;
    private readonly _validationErrors: ArrayList<PropertyValidationException> = new ArrayList();

    public get isValid(): boolean {
        return this._validationErrors.isEmpty;
    }

    public get validationErrors(): ReadOnlyList<PropertyValidationException> {
        return this._validationErrors;
    }

    public constructor(initialValue: T, configuration: PropertyConfiguration<T> = PropertyConfiguration.DEFAULT) {
        this._value = new ObservableValue(initialValue, configuration.comparator);
        this._validationRules = configuration.validationRules;

        this.validate();
    }

    public dispose(): void {
        this._value.dispose();
    }

    @Delegate
    public get(): T {
        return this._value.get();
    }

    @Delegate
    public set(value: T): void {
        this._value.set(value);

        this.validate();
    }

    public subscribe(observer: Observer<T>): Disposable {
        return this._value.subscribe(observer);
    }

    private validate(): void {
        this._validationErrors.clear();

        for (const rule of this._validationRules) {
            try {
                rule.validate(this._value.get());
            } catch (e) {
                if (e instanceof PropertyValidationException) {
                    this._validationErrors.add(e);
                } else {
                    throw e;
                }
            }
        }
    }
}
