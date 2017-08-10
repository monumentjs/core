import {IRuntimeRestrictions} from './IRuntimeRestrictions';
import {Runtime} from './Runtime';
import {RuntimeID} from './RuntimeID';
import {Container} from '../DI/Container/Container';
import {Assert} from '../Assertion/Assert';
import {Singleton} from '../DI/Decorators/Singleton';


@Singleton({
    providers: [
        Runtime
    ]
})
export class RuntimeRestriction {
    public static MethodDefinition(restrictions: IRuntimeRestrictions): MethodDecorator {
        return (prototype: object,
                methodName: string,
                descriptor: TypedPropertyDescriptor<Function>): TypedPropertyDescriptor<Function> | void => {
            const restriction: RuntimeRestriction = Container.get(RuntimeRestriction);

            if (restriction.match(restrictions)) {
                return descriptor;
            }

            return undefined;
        };
    }


    public constructor(private runtime: Runtime) {

    }


    public match(restrictions: IRuntimeRestrictions): boolean {
        Assert.argument('restrictions', restrictions).notNull();

        const {allow, disallow} = restrictions;
        const currentRuntime: RuntimeID = this.runtime.id;
        const allowedRestrictionPassed: boolean = allow ? allow.indexOf(currentRuntime) >= 0 : true;
        const disallowedRestrictionPasses: boolean = disallow ? disallow.indexOf(currentRuntime) < 0 : true;

        return allowedRestrictionPassed && disallowedRestrictionPasses;
    }
}

