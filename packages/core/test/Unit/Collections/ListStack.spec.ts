import {ListStack} from '../../../../collections/main/ListStack';
import {StackSpec} from './Abstract/StackSpec';
import {Test} from '../../../../test-drive/Decorators/TestConfiguration';


@Test()
export class ListStackSpec extends StackSpec {

    public create<T>(items?: Iterable<T>): ListStack<T> {
        return new ListStack(items);
    }
}
