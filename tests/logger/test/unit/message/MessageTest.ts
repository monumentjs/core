import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {Message} from '@monument/logger/main/message/Message';
import {Level} from '@monument/logger/main/level/Level';
import {Marker} from '@monument/logger/main/marker/Marker';
import {Exception} from '@monument/core/main/exceptions/Exception';


export class MessageTest {
    private static readonly LOGGER_NAME = 'TestLogger';
    private static readonly MESSAGE_TEXT = 'Hello User! Please visit https://github.com/monumentjs/core for more details.';
    private static readonly EXCEPTION = new Exception('Something went wrong');
    private static readonly MARKER = new Marker('Error');

    private readonly helloMessage: Message = new Message(
        MessageTest.LOGGER_NAME,
        Level.ERROR,
        MessageTest.MESSAGE_TEXT,
        MessageTest.EXCEPTION,
        MessageTest.MARKER
    );


    @Test
    public 'properties'(assert: Assert) {
        assert.equals(this.helloMessage.loggerName, MessageTest.LOGGER_NAME);
        assert.equals(this.helloMessage.text, MessageTest.MESSAGE_TEXT);
        assert.equals(this.helloMessage.error, MessageTest.EXCEPTION);
        assert.equals(this.helloMessage.marker, MessageTest.MARKER);
        assert.equals(this.helloMessage.level, Level.ERROR);
    }
}
