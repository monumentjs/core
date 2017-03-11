
export default class RegExpUtils {
    public static escape(pattern: string): string {
        return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    }
}
