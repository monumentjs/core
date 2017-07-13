export declare class TextTransform {
    static toUpperCase(input: string): string;
    static toLowerCase(input: string): string;
    static toCamelCase(input: string): string;
    static toKebabCase(input: string): string;
    static toCapitalCase(input: string): string;
    static padStart(input: string, targetLength: number, padString?: string): string;
    static padEnd(input: string, targetLength: number, padString?: string): string;
    static clipStart(input: string, targetLength: number): string;
    static clipEnd(input: string, targetLength: number): string;
    private static splitStringForCaseTransformation(input);
}
