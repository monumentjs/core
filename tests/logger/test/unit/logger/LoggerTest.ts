import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Test} from '@monument/test-drive/main/decorators/Test';
import {BeforeEach} from '@monument/test-drive/main/decorators/BeforeEach';
import {AfterEach} from '@monument/test-drive/main/decorators/AfterEach';
import {Logger} from '@monument/logger/main/logger/Logger';
import {LoggerConfiguration} from '@monument/logger/main/logger/LoggerConfiguration';
import {AbstractAppender} from '@monument/logger/main/appender/AbstractAppender';
import {Message} from '@monument/logger/main/message/Message';
import {Filter} from '@monument/logger/main/filter/Filter';
import {RegExpFilter} from '@monument/logger/main/filter/RegExpFilter';
import {Level} from '@monument/logger/main/level/Level';
import {ArrayList} from '@monument/core/main/collection/mutable/ArrayList';
import {Exception} from '@monument/core/main/exceptions/Exception';


class TestAppender extends AbstractAppender {
    public messages: ArrayList<Message> = new ArrayList();


    public constructor(filters?: Iterable<Filter>) {
        super('TestAppender', filters);
    }


    protected async doAppend(message: Message): Promise<void> {
        this.messages.add(message);
    }
}


export class LoggerTest {
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
        assert.equals(this.appender.messages.length, 0);

        const error: Exception = new Exception('Test Error');

        await this.logger.trace(LoggerTest.TRANSACTION_ERROR_MESSAGE);
        await this.logger.debug(LoggerTest.TRANSACTION_ERROR_MESSAGE);
        await this.logger.info(LoggerTest.TRANSACTION_ERROR_MESSAGE);
        await this.logger.warning(LoggerTest.TRANSACTION_ERROR_MESSAGE);
        await this.logger.error(LoggerTest.TRANSACTION_ERROR_MESSAGE, error);
        await this.logger.fatal(LoggerTest.TRANSACTION_ERROR_MESSAGE, error);

        assert.equals(this.appender.messages.length, 6);

        assert.equals(this.appender.messages.getAt(0).text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.messages.getAt(0).error, undefined);
        assert.equals(this.appender.messages.getAt(0).level, Level.TRACE);
        assert.equals(this.appender.messages.getAt(0).loggerName, 'TestLogger');
        assert.equals(this.appender.messages.getAt(0).marker, undefined);

        assert.equals(this.appender.messages.getAt(1).text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.messages.getAt(1).error, undefined);
        assert.equals(this.appender.messages.getAt(1).level, Level.DEBUG);
        assert.equals(this.appender.messages.getAt(1).loggerName, 'TestLogger');
        assert.equals(this.appender.messages.getAt(1).marker, undefined);

        assert.equals(this.appender.messages.getAt(2).text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.messages.getAt(2).error, undefined);
        assert.equals(this.appender.messages.getAt(2).level, Level.INFO);
        assert.equals(this.appender.messages.getAt(2).loggerName, 'TestLogger');
        assert.equals(this.appender.messages.getAt(2).marker, undefined);

        assert.equals(this.appender.messages.getAt(3).text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.messages.getAt(3).error, undefined);
        assert.equals(this.appender.messages.getAt(3).level, Level.WARNING);
        assert.equals(this.appender.messages.getAt(3).loggerName, 'TestLogger');
        assert.equals(this.appender.messages.getAt(3).marker, undefined);

        assert.equals(this.appender.messages.getAt(4).text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.messages.getAt(4).error, error);
        assert.equals(this.appender.messages.getAt(4).level, Level.ERROR);
        assert.equals(this.appender.messages.getAt(4).loggerName, 'TestLogger');
        assert.equals(this.appender.messages.getAt(4).marker, undefined);

        assert.equals(this.appender.messages.getAt(5).text, LoggerTest.TRANSACTION_ERROR_MESSAGE);
        assert.equals(this.appender.messages.getAt(5).error, error);
        assert.equals(this.appender.messages.getAt(5).level, Level.FATAL);
        assert.equals(this.appender.messages.getAt(5).loggerName, 'TestLogger');
        assert.equals(this.appender.messages.getAt(5).marker, undefined);
    }
}
