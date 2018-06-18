import {Message} from './Message';


export interface MessageFormatter {
    format(message: Message): string;
}
