import * as React from 'react';
import {Observer} from '@monument/core/main/observable/Observer';
import {Value} from '@monument/core/main/observable/Value';
import {ArrayList} from '@monument/core/main/collection/ArrayList';
import {Disposable} from '@monument/core/main/Disposable';


interface PropertyBinding<T> {
    readonly key: string;
    readonly value: Value<T>;
    readonly observer: Observer<T>;
    readonly subscription: Disposable;
}


export class Component<TProps = {}, TState = {}> extends React.Component<TProps, TState> {
    public static readonly BINDING_PROPERTY_NAME_SUFFIX = 'Binding';


    /**
     * Map of binding property name to value observer.
     */
    private readonly _observers: ArrayList<PropertyBinding<any>> = new ArrayList();


    public componentWillMount() {
        this.updateBindings(this.props);
    }

    public componentWillUnmount() {
        this.destroyBindings();
    }


    public componentWillReceiveProps(props: TProps): void {
        this.updateBindings(props);
    }


    protected addBinding(key: string, value: Value<any>): void {
        const observer: Observer<any> = {
            onNext: (val: any) => {
                this.setState({
                    [key]: val
                } as any);
            },
            onCompleted() {/**/},
            onError() {/**/}
        };

        const subscription: Disposable = value.subscribe(observer);

        this._observers.add({
            key, value, observer, subscription
        });
    }


    protected updateBindings(props: any): void {
        this.destroyBindings();

        Object.keys(props).forEach((propName: string) => {
            if (propName.endsWith(Component.BINDING_PROPERTY_NAME_SUFFIX)) {
                const value = props[propName];

                if (value != null) {
                    this.addBinding(propName, value);
                }
            }
        });
    }


    protected destroyBindings(): void {
        this._observers.forEach((binding: PropertyBinding<any>) => {
            binding.subscription.dispose();
        });

        this._observers.clear();
    }
}

