import {assertArgumentNotNull} from '../Assertion/Assert';


export class RegExpUtils {
    public static escape(pattern: string): string {
        assertArgumentNotNull('pattern', pattern);

        return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    }
}
