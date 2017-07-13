import {Assert} from '../Assertion/Assert';


export class RegExpUtils {
    public static escape(pattern: string): string {
        Assert.argument('pattern', pattern).notNull();

        return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    }
}
