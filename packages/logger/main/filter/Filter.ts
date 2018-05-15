import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {LogEvent} from '../event/LogEvent';
import {FilterDecision} from './FilterDecision';


export interface Filter extends Lifecycle {
    decide(event: LogEvent): Promise<FilterDecision>;
}
