import {Service} from '@monument/stereotype/main/Service';
import {FunctionMock} from './FunctionMock';


@Service
export class MockFactory {

    public function<TFunc extends Function = Function>(implementation?: TFunc): FunctionMock<TFunc> {
        return new FunctionMock(implementation);
    }
}
