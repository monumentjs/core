import {VERSION_PATTERN} from './types';
import {Assert} from '../Assertion/Assert';
import {Singleton} from '../DI/Decorators/Singleton';
import {ParsingException} from '../Text/Parsing/ParsingException';


@Singleton()
export class VersionValidator {

    public validate(version: string): void {
        Assert.argument('version', version).notNull();

        if (VERSION_PATTERN.test(version) === false) {
            throw new ParsingException(`Invalid version format.`);
        }
    }

}
