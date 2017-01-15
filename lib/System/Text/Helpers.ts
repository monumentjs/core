

function splitStringForCaseTransformation(input: string): string[] {
    let slices: string[];

    slices = input.split(/[ _-]+/g);

    slices = slices.filter((slice: string) => {
        return slice.length > 0;
    });

    return slices;
}


export function toCamelCase(input: string): string {
    let slices: string[] = splitStringForCaseTransformation(input);

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


export function toKebabCase(input: string): string {
    return input.replace(/[A-Z]/g, function (substring: string): string {
        return '-' + substring;
    }).replace(/[ _-]+/g, '-').toLowerCase();
}


