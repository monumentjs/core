import {AbstractLifecycle} from '@monument/core/main/lifecycle/AbstractLifecycle';
import {LogEvent} from '../event/LogEvent';
import {Filter} from './Filter';
import {FilterDecision} from './FilterDecision';


export abstract class AbstractFilter extends AbstractLifecycle implements Filter {
    public abstract decide(event: LogEvent): Promise<FilterDecision>;
}
