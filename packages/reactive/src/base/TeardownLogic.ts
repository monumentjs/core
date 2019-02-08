import { TeardownFunction } from './TeardownFunction';
import { Unsubscribable } from './Unsubscribable';

export type TeardownLogic = TeardownFunction | Unsubscribable | void;
