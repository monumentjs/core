import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';
import {Message} from '../message/Message';
import {FilterDecision} from './FilterDecision';


export interface Filter extends Lifecycle {
    decide(message: Message): Promise<FilterDecision>;
}
