import { Observer } from './Observer';
import { TeardownLogic } from './TeardownLogic';

export type SubscribeFunction<T> = (observer: Observer<T>) => TeardownLogic;
