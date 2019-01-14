import {Observer} from './Observer';
import {SubscriptionTeardownLogic} from './SubscriptionTeardownLogic';

export type SubscriptionProducer<T> = (observer: Observer<T>) => SubscriptionTeardownLogic | void;
