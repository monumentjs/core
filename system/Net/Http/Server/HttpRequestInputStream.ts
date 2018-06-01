import {IncomingMessage} from 'http';
import {AbstractInputStream} from '../../../Stream/AbstractInputStream';


export class HttpRequestInputStream extends AbstractInputStream<Buffer, IncomingMessage> {

}
