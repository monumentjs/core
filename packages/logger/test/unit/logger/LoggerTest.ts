import {ArrayList} from '@monument/collections/main/ArrayList';
import {Assert} from '@monument/test-drive/main/modules/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {AfterEach} from '@monument/test-drive/main/decorators/AfterEach';
import {Logger} from '../../../main/logger/Logger';
import {LoggerConfiguration} from '../../../main/logger/LoggerConfiguration';
import {AbstractAppender} from '../../../main/appender/AbstractAppender';
import {LogEvent} from '../../../main/event/LogEvent';
import {Filter} from '../../../main/filter/Filter';
import {RegExpFilter} from '../../../main/filter/RegExpFilter';
import {Level} from '../../../main/level/Level';


class TestAppender extends AbstractAppender {
    public events: ArrayList<LogEvent> = new ArrayList();


    public constructor(filters?: Iterable<Filter>) {
        super('TestAppender', filters);
    }


    protected async doAppend(event: LogEvent): Promise<void> {
        this.events.add(event);
    }
}


export class LoggerTest {
    private static readonly TRANSACTION_ERROR_TEMPLATE = 'Transaction error: code {0}';
    private static readonly TRANSACTION_ERROR_CODE = 230;
    private static readonly TRANSACTION_ERROR_MESSAGE = 'Transaction error: code 230';

    private filter: RegExpFilter = new RegExpFilter(/transaction error/i);
    private appender!: TestAppender;
    private configuration!: LoggerConfiguration;
    private logger!: Logger;


    @BeforeEach
    public async setup() {
        this.appender = new TestAppender([
            this.filter
        ]);
        this.configuration = new LoggerConfiguration([
            this.appender
        ]);
        this.logger = new Logger('TestLogger', this.configuration);

        await this.appender.initialize();
        await this.appender.start();
    }


    @AfterEach
    public async cleanup() {
        await this.appender.stop();
    }


    @Test
    public async 'logger sends log events to appenders'(assert: Assert) {
        assert.equals(this.appender.events.length, 0);

        const error: Error = new Error('Test Error');

        await this.logger.trace(LoggerTest.TRANSACTION_ERROR_TEMPLATE, LoggerTest.TRANSACTION_ERROR_CODE);
        await this.logger.debug(LoggerTest.TRANSACTION_ERROR_TEMPLATE, LoggerTest.TRANSACTION_ERROR_CODE);
        await this.logger.info(LoggerTest.TRANSACTION_ERROR_TEMPLATE, LoggerTest.TRANSACTION_ERROR_CODE);
        await this.logger.warning(LoggerTest.TRANSACTION_ERROR_TEMPLATE, LoggerTest.TRANSACTION_ERROR_CODE);
        await this.logger.error(LoggerTest.TRANSACTION_ERROR_TEMPLATE, error, LoggerTest.TRANSACTION_ERROR_CODE);
        await this.logger.fatal(LoggerTest.TRANSACTION_ERROR_TEMPLATE, error, LoggerTest.TRANSACTION_ERROR_CODE);

        assert.equals(this.appender.events.length, 6);

        assert.equals(this.appender.events.getAt(0).message.text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.events.getAt(0).message.error, undefined);
        assert.equals(this.appender.events.getAt(0).level, Level.TRACE);
        assert.equals(this.appender.events.getAt(0).loggerName, 'TestLogger');
        assert.equals(this.appender.events.getAt(0).marker, undefined);

        assert.equals(this.appender.events.getAt(1).message.text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.events.getAt(1).message.error, undefined);
        assert.equals(this.appender.events.getAt(1).level, Level.DEBUG);
        assert.equals(this.appender.events.getAt(1).loggerName, 'TestLogger');
        assert.equals(this.appender.events.getAt(1).marker, undefined);

        assert.equals(this.appender.events.getAt(2).message.text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.events.getAt(2).message.error, undefined);
        assert.equals(this.appender.events.getAt(2).level, Level.INFO);
        assert.equals(this.appender.events.getAt(2).loggerName, 'TestLogger');
        assert.equals(this.appender.events.getAt(2).marker, undefined);

        assert.equals(this.appender.events.getAt(3).message.text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.events.getAt(3).message.error, undefined);
        assert.equals(this.appender.events.getAt(3).level, Level.WARNING);
        assert.equals(this.appender.events.getAt(3).loggerName, 'TestLogger');
        assert.equals(this.appender.events.getAt(3).marker, undefined);

        assert.equals(this.appender.events.getAt(4).message.text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.events.getAt(4).message.error, error);
        assert.equals(this.appender.events.getAt(4).level, Level.ERROR);
        assert.equals(this.appender.events.getAt(4).loggerName, 'TestLogger');
        assert.equals(this.appender.events.getAt(4).marker, undefined);

        assert.equals(this.appender.events.getAt(5).message.text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.events.getAt(5).message.error, error);
        assert.equals(this.appender.events.getAt(5).level, Level.FATAL);
        assert.equals(this.appender.events.getAt(5).loggerName, 'TestLogger');
        assert.equals(this.appender.events.getAt(5).marker, undefined);
    }
}
