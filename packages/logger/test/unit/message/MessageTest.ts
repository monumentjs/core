import {Test} from '@monument/test-drive/main/decorators/Test';
import {Assert} from '@monument/test-drive/main/modules/assert/Assert';
import {Message} from '../../../main/message/Message';


export class MessageTest {
    private static readonly MESSAGE_TEXT = 'Hello User! Please visit https://github.com/monumentjs/core for more details.';

    private readonly helloMessage: Message = new Message(MessageTest.MESSAGE_TEXT);


    @Test
    public 'message text'(assert: Assert) {
        assert.equals(this.helloMessage.text, MessageTest.MESSAGE_TEXT);
        assert.equals(this.helloMessage.error, undefined);
    }
}
