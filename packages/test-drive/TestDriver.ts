

export type TestFunction = () => void | Promise<void>;


export interface TestDriver {
    defineTestSuite(description: string, fn: TestFunction): void;
    defineTestCase(description: string, fn: TestFunction): void;
    defineBeforeAllHook(fn: TestFunction): void;
    defineAfterAllHook(fn: TestFunction): void;
    defineBeforeEachHook(fn: TestFunction): void;
    defineAfterEachHook(fn: TestFunction): void;
}
