import {TestFileStartedMessage} from './TestFileStartedMessage';
import {TestFileEndedMessage} from './TestFileEndedMessage';

export type ProcessMessages = TestFileStartedMessage | TestFileEndedMessage;
