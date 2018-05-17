import {AbstractLifecycle} from '@monument/core/main/lifecycle/AbstractLifecycle';
import {Message} from '../message/Message';
import {Filter} from './Filter';
import {FilterDecision} from './FilterDecision';


export abstract class AbstractFilter extends AbstractLifecycle implements Filter {
    public abstract decide(message: Message): Promise<FilterDecision>;
}
