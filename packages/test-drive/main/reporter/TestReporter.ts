import {Component} from '@monument/decorators/main/stereotype/Component';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {TestReport} from './TestReport';
import {TestStatus} from './TestStatus';
import {Exception} from '@monument/core/main/exceptions/Exception';


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
            await this._logger.error(message, Exception.cast(report.error as Error));
        } else {
            await this._logger.info(message);
        }
    }
}
