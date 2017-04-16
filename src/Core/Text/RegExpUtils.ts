import {assertArgumentNotNull} from '../Assertion/Assert';


export default class RegExpUtils {
    public static escape(pattern: string): string {
        assertArgumentNotNull('pattern', pattern);

        return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    }
}
