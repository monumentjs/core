import {Service} from '@monument/stereotype/main/Service';
import {FunctionMock} from './FunctionMock';


@Service
export class MockFactory {

    public function<T extends Function = Function>(implementation?: Function): FunctionMock<T> {
        return new FunctionMock(implementation);
    }
}
