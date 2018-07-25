import * as React from 'react';
import {StringPool} from '@monument/core/main/StringPool';


export function mergeClassNames(...names: Array<string | undefined>): string {
    return names.filter((name) => !!name).join(StringPool.SPACE);
}

export function mergeStyles(...styles: Array<React.CSSProperties | undefined>): React.CSSProperties | undefined {
    let result: React.CSSProperties | undefined;

    for (const style of styles) {
        if (style != null) {
            if (result != null) {
                result = {...result, ...style};
            } else {
                result = {...style};
            }
        }
    }

    return result;
}

export function mergeProps(...props: Array<React.HTMLAttributes<HTMLElement>>): React.HTMLAttributes<HTMLElement> {
    let result: React.HTMLAttributes<HTMLElement> = {};

    for (const {className, style, ...others} of props) {
        result = {
            ...result,
            ...others,
            className: mergeClassNames(result.className, className),
            style: mergeStyles(result.style, style)
        };
    }

    return result;
}

export function notNullOrFallback<T>(value: T | null | undefined, fallback: T): T {
    return value == null ? fallback : value;
}

export function renderElement<TProps extends React.HTMLAttributes<HTMLElement>>(elementName: string, ...props: TProps[]): JSX.Element {
    return React.createElement(elementName, mergeProps(...props));
}
