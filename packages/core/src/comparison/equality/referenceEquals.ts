import {EqualsFunction} from './EqualsFunction';

export const referenceEquals: EqualsFunction<any> = (x: any, y: any): boolean => {
    return x === y;
};
