import {InputStream} from './InputStream';
import {OutputStream} from './OutputStream';


export interface DuplexStream<T> extends InputStream<T>, OutputStream<T> {

}
