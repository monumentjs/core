import {TestRunner} from '../../main/runner/TestRunner';
import {Test} from '../../main/configuration/decorators/Test';
import {assertTrue} from '../../main/assert/Assert';
import {Reporter} from '../../main/reporter/Reporter';
import {ReportRecord} from '../../main/reporter/ReportRecord';


const RETURNS_BIGGEST_NUMBER_TEST_NAME = 'returns biggest number';
const RETURNS_SMALLEST_NUMBER_TEST_NAME = 'returns smallest number';


class MathTests {

    @Test
    public [RETURNS_BIGGEST_NUMBER_TEST_NAME]() {
        assertTrue(Math.max(1, 2, 3) === 3);
    }

    @Test
    public [RETURNS_SMALLEST_NUMBER_TEST_NAME]() {
        assertTrue(Math.min(1, 2, 3) === 1);
    }
}


describe('TestRunner', () => {
    const records: ReportRecord[] = [];
    const reporter: Reporter = {
        async report(record: ReportRecord) {
            records.push(record);
        }
    };
    const runner: TestRunner = new TestRunner();

    runner.addReporter(reporter);

    beforeEach(() => {
        records.length = 0;
    });

    it(`executes test scenario`, async () => {
        expect(records.length).toBe(0);

        await runner.run(MathTests);

        expect(records.length).toBe(2);

        expect(records[0].className).toBe(MathTests.name);
        expect(records[0].methodName).toBe(RETURNS_BIGGEST_NUMBER_TEST_NAME);
        expect(records[0].exception).toBeUndefined();

        expect(records[1].className).toBe(MathTests.name);
        expect(records[1].methodName).toBe(RETURNS_SMALLEST_NUMBER_TEST_NAME);
        expect(records[1].exception).toBeUndefined();
    });
});

