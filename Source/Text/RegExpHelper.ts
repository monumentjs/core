import {Assert} from '../Assertion/Assert';
import {Container} from '../DI/Container/Container';
import {Singleton} from '../DI/Decorators/Singleton';


@Singleton()
export class RegExpHelper {
    public static get instance(): RegExpHelper {
        return Container.get(this);
    }


    public escape(pattern: string): string {
        Assert.argument('pattern', pattern).notNull();

        return pattern.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&');
    }
}
