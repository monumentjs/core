import * as React from 'react';
import {renderElement} from '../utils/ReactUtils';
import {Value} from '@monument/core/main/observable/Value';
import {Delegate} from '@monument/core/main/decorators/Delegate';
import {Binding} from '@monument/react/main/binding/configuration/decorators/Binding';
import {Component} from '@monument/react/main/component/Component';
import {StringPool} from '@monument/core/main/StringPool';
import {TextAreaSizingMode} from './TextAreaSizingMode';


export interface TextAreaAttributes extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    readonly valueBinding?: Value<string>;
    readonly sizingMode?: TextAreaSizingMode;
}


export interface TextAreaState {
    readonly value: string;
}


export class TextArea extends Component<TextAreaAttributes, TextAreaState> {
    @Binding
    public value!: string;


    public constructor(props: TextAreaAttributes) {
        super(props);

        this.state = {
            value: StringPool.BLANK
        };
    }


    public render(): JSX.Element {
        let {valueBinding, onChange, children, sizingMode, ...props} = this.props;

        return renderElement<TextAreaAttributes>('textarea', {
            className: 'TextArea',
            defaultValue: this.value,
            onChange: this.onChange
        }, props);
    }


    @Delegate
    protected onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const {onChange} = this.props;

        this.value = event.currentTarget.value;

        this.autoSizeElement(event.currentTarget);

        if (onChange) {
            onChange(event);
        }
    }


    private autoSizeElement(element: HTMLTextAreaElement) {
        if (this.props.sizingMode === TextAreaSizingMode.AUTO) {
            const styles = window.getComputedStyle(element);
            const borderTopWidth = parseFloat(styles.borderTopWidth || '0');
            const borderBottomWidth = parseFloat(styles.borderBottomWidth || '0');

            element.style.height = '0';
            element.style.height = (element.scrollHeight + borderTopWidth + borderBottomWidth) + 'px';
        }
    }
}
