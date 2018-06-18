import {TestMethod} from './TestMethod';


export class TestCase extends TestMethod {

    public get description(): string {
        return this.method.name.toString();
    }
}
