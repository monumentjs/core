import {ISingletonConfiguration} from './ISingletonConfiguration';
import {Singleton} from './Singleton';

/**
 * Alias for @Singleton decorator but with more high-level meaning.
 *
 * @see {Singleton}
 * @param {ISingletonConfiguration<T>} unitConfiguration
 */
export function Service<T>(unitConfiguration: ISingletonConfiguration<T> = {}): ClassDecorator {
    return Singleton(unitConfiguration);
}
