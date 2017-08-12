import {Assert} from '../Assertion/Assert';
import {Singleton} from '../DI/Decorators/Singleton';


@Singleton()
export class RegExpHelper {
    public escape(pattern: string): string {
        Assert.argument('pattern', pattern).notNull();

        return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    }
}
