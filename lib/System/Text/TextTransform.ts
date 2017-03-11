

export default class TextTransform {
    public static toUpperCase(input: string): string {
        return input.toUpperCase();
    }
    
    
    public static toLowerCase(input: string): string {
        return input.toLowerCase();
    }
    
    
    public static toCamelCase(input: string): string {
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


    public static toKebabCase(input: string): string {
        return input.replace(/[A-Z]/g, function (substring: string): string {
            return '-' + substring;
        }).replace(/[ _-]+/g, '-').toLowerCase();
    }


    public static padStart(input: string, targetLength: number, padString: string = ' '): string {
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


    public static padEnd(input: string, targetLength: number, padString: string = ' '): string {
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


    public static clipStart(input: string, targetLength: number): string {
        if (input.length > targetLength) {
            return input.substring(0, targetLength);
        }

        return input;
    }


    public static clipEnd(input: string, targetLength: number): string {
        if (input.length > targetLength) {
            return input.substring(input.length - targetLength);
        }

        return input;
    }


    private static splitStringForCaseTransformation(input: string): string[] {
        let slices: string[];

        slices = input.split(/[ _-]+/g);

        slices = slices.filter((slice: string) => {
            return slice.length > 0;
        });

        return slices;
    }

}

