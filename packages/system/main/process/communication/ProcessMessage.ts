import {ProcessInfoRequestMessage} from './ProcessInfoRequestMessage';
import {ProcessInfoResponseMessage} from './ProcessInfoResponseMessage';
import {ProcessExitMessage} from './ProcessExitMessage';
import {ProcessMessageMessage} from './ProcessMessageMessage';


export type ProcessMessage<TMessage> = ProcessInfoRequestMessage | ProcessInfoResponseMessage | ProcessExitMessage | ProcessMessageMessage<TMessage>;
