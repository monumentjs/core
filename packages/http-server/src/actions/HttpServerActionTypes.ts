import {HttpServerCloseAction} from './HttpServerCloseAction';
import {HttpServerErrorAction} from './HttpServerErrorAction';
import {HttpServerRequestAction} from './HttpServerRequestAction';

export type HttpServerActionTypes = HttpServerRequestAction | HttpServerErrorAction | HttpServerCloseAction;
