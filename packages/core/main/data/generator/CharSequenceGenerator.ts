

export interface CharSequenceGenerator {
    generate(length: number, charset: string): string;
}
