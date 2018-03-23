import { TestDriver, TestFunction } from './TestDriver';


export class JestTestDriver implements TestDriver {

    public defineTestSuite(name: string, fn: TestFunction): void {
        describe(name, fn);
    }


    public defineTestCase(description: string, fn: TestFunction): void {
        test(description, fn);
    }


    public defineBeforeAllHook(fn: TestFunction): void {
        beforeAll(fn);
    }


    public defineAfterAllHook(fn: TestFunction): void {
        afterAll(fn);
    }


    public defineBeforeEachHook(fn: TestFunction): void {
        beforeEach(fn);
    }


    public defineAfterEachHook(fn: TestFunction): void {
        afterEach(fn);
    }
}
