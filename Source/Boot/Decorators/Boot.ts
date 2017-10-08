import {ApplicationContext} from '../../Application/ApplicationContext';
import {IApplicationEntryPoint} from '../../Application/Abstraction/IApplicationEntryPoint';
import {Type} from '../../Core/Types/Type';
import {DecoratorTarget} from '../../Language/Support/Decorators/DecoratorTarget';
import {Target} from '../../Language/Decorators/Target';
import {RandomStringGenerator} from '../../Data/Generation/RandomStringGenerator';
import {Version} from '../../Version/Version';


export function Boot(
    applicationName: string = 'Unnamed',
    applicationId: string = RandomStringGenerator.getAlphabeticString(32),
    applicationVersion: Version = Version.zero
): ClassDecorator {
    return function (target: Type<IApplicationEntryPoint>): void {
        Target(DecoratorTarget.Class)(...arguments);

        const context: ApplicationContext = new ApplicationContext(
            applicationName,
            applicationId,
            applicationVersion
        );
        const app: IApplicationEntryPoint = context.getUnit(target);

        app.main();
    } as ClassDecorator;
}
