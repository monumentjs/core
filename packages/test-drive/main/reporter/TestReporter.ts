import {Component} from '@monument/stereotype/main/Component';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {TestReport} from './TestReport';
import {TestStatus} from './TestStatus';


@Component
export class TestReporter {
    private readonly _logger: Logger;


    public constructor(lm: LoggerManager) {
        this._logger = lm.getLogger(this.constructor.name);
    }


    public async report(report: TestReport): Promise<void> {
        const {status, testMethodName, testClassName, duration} = report;
        const message = `${TestStatus[status]} in ${duration}ms: ${testClassName} > ${testMethodName}`;

        if (report.status === TestStatus.FAILED) {
            await this._logger.error(message, report.error);
        } else {
            await this._logger.info(message);
        }
    }
}
