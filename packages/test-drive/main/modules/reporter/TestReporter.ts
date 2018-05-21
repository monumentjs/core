import {Component} from '@monument/stereotype/main/Component';
import {TestFileReport} from './TestFileReport';
import {LoggerManager} from '@monument/logger/main/manager/LoggerManager';
import {Logger} from '@monument/logger/main/logger/Logger';


@Component
export class TestReporter {
    private readonly _logger: Logger;


    public constructor(lm: LoggerManager) {
        this._logger = lm.getLogger(this.constructor.name);
    }


    public async report(report: TestFileReport): Promise<void> {
        await this._logger.info(report.testClassName);
    }
}
