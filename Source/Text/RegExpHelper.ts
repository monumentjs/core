

export class RegExpHelper {
    public static escape(pattern: string): string {
        return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    }
}
