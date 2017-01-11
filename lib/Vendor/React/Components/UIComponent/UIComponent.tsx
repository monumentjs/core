import * as React from 'react';
import {Pool} from '../../../../Core/types';
import BaseComponent from '../BaseComponent';
import Transition from '../../../../UI/Transition/Transition';


export interface IUIComponentProps extends React.HTMLProps<any> { }


export default class UIComponent<P extends IUIComponentProps, S> extends BaseComponent<P, S> {
    private _transitions: Pool<Transition>;
    private _elements: Pool<Element>;
    private _components: Pool<React.ReactNode>;


    get transitions(): Pool<Transition> {
        return this._transitions;
    }

 
    get elements(): Pool<Element> {
        return this._elements;
    }


    get components(): Pool<React.ReactNode> {
        return this._components;
    }


    constructor(props?: P, context?: any) {
        super(props, context);

        this._transitions = Object.create(null);
        this._elements = Object.create(null);
        this._components = Object.create(null);
    }


    protected saveElementReference<T extends Element>(alias: string): React.Ref<T> {
        return (element: T) => {
            this._elements[alias] = element;
        };
    }


    protected saveComponentReference<T extends React.ReactNode>(alias: string): React.Ref<T> {
        return (component: T) => {
            this._components[alias] = component;
        };
    }
}