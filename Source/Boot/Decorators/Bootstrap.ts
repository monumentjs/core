import {Constructor} from '../../types';
import {Application} from '../../Application/Application';
import {Assert} from '../../Assertion/Assert';
import {Container} from '../../DI/Container/Container';
import {BootReflection} from '../Reflections/BootReflection';
import {BootstrapException} from './BootstrapException';


/**
 * @throws {ArgumentNullException} If application constructor is not defined.
 * @throws {MissingConstructorArgumentsException} If container cannot instantiate application.
 */
export function Bootstrap(): ClassDecorator {
    return async (constructor: Constructor<Application>): Promise<void> => {
        Assert.argument('constructor', constructor).notNull();

        const reflection: BootReflection<Application> = new BootReflection(constructor);

        if (reflection.hasApplicationInstance) {
            throw new BootstrapException(`Application ${constructor.name} already instantiated.`);
        }

        const application = Container.get(constructor);

        await application.main();

        reflection.applicationInstance = application;
    };
}

