import {Container} from '../DI/Container/Container';
import {Singleton} from '../DI/Decorators/Singleton';


@Singleton()
export class TextTransform {
    public static get instance(): TextTransform {
        return Container.get(this);
    }


    public toUpperCase(input: string): string {
        return input.toUpperCase();
    }


    public toLowerCase(input: string): string {
        return input.toLowerCase();
    }


    public toCamelCase(input: string): string {
        let slices: string[] = this.splitStringForCaseTransformation(input);

        slices = slices.map((slice: string, index: number): string => {
            let firstChar: string = slice[0];

            if (index === 0) {
                return firstChar.toLowerCase() + slice.substring(1);
            } else {
                return firstChar.toUpperCase() + slice.substring(1);
            }
        });

        return slices.join('');
    }


    public toKebabCase(input: string): string {
        return input.replace(/[A-Z]/g, function (substring: string): string {
            return '-' + substring;
        }).replace(/[ _-]+/g, '-').toLowerCase();
    }


    public toCapitalCase(input: string): string {
        // TODO: test and cleanup
        // let slices: string[] = this.splitStringForCaseTransformation(input);
        //
        // slices = slices.map((slice: string, index: number): string => {
        //     let firstChar: string = slice[0];
        //
        //     return firstChar.toUpperCase() + slice.substring(1).toLowerCase();
        // });
        //
        // return slices.join('');

        return input.replace(/(\b.)/g, (substring: string): string => {
            return substring.toUpperCase();
        });
    }


    public padStart(input: string, targetLength: number, padString: string = ' '): string {
        if (input.length > targetLength) {
            return input;
        } else {
            targetLength = targetLength - input.length;

            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }

            return padString.slice(0, targetLength) + input;
        }
    }


    public padEnd(input: string, targetLength: number, padString: string = ' '): string {
        if (input.length > targetLength) {
            return input;
        } else {
            targetLength = targetLength - input.length;

            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length);
            }

            return input + padString.slice(0, targetLength);
        }
    }


    public clipStart(input: string, targetLength: number): string {
        if (input.length > targetLength) {
            return input.substring(0, targetLength);
        }

        return input;
    }


    public clipEnd(input: string, targetLength: number): string {
        if (input.length > targetLength) {
            return input.substring(input.length - targetLength);
        }

        return input;
    }


    private splitStringForCaseTransformation(input: string): string[] {
        let slices: string[];

        slices = input.split(/[ _-]+/g);

        slices = slices.filter((slice: string) => {
            return slice.length > 0;
        });

        return slices;
    }
}

