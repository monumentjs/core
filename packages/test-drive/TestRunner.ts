import {TestDriver} from './TestDriver';
import {TestConfiguration} from './main/base/TestConfiguration';


export class TestRunner {
    private _testDriver: TestDriver;


    public constructor(testDriver: TestDriver) {
        this._testDriver = testDriver;
    }


    public run(test: TestConfiguration): void {

        this._testDriver.defineTestSuite(test.description, () => {
            for (let testCase of test.testCases) {
                if (testCase.isBeforeAll) {
                    this._testDriver.defineBeforeAllHook(() => {
                        return testSuite[key]();
                    });
                }

                if (testCase.isAfterAll) {
                    this._testDriver.defineAfterAllHook(() => {
                        return testSuite[key]();
                    });
                }

                if (testCase.isBeforeEach) {
                    this._testDriver.defineBeforeEachHook(() => {
                        return testSuite[key]();
                    });
                }

                if (testCase.isAfterEach) {
                    this._testDriver.defineAfterEachHook(() => {
                        return testSuite[key]();
                    });
                }

                if (value.hasAttribute(TEST_CASE_ATTRIBUTE)) {
                    let testCaseDisplayName: string | undefined = value.getAttribute(DISPLAY_NAME_ATTRIBUTE);

                    this._testDriver.defineTestCase(testCaseDisplayName || String(key), () => {
                        return testSuite[key]();
                    });
                }
            }
        });

    }
}
