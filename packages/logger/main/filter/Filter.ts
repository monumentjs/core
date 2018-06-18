import {Message} from '../message/Message';
import {FilterDecision} from './FilterDecision';
import {Lifecycle} from '@monument/core/main/lifecycle/Lifecycle';


export interface Filter extends Lifecycle {
    decide(message: Message): Promise<FilterDecision>;
}
