import {Type} from '@monument/core/main/Type';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {Method} from '@monument/reflection/main/Method';
import {Parameter} from '@monument/reflection/main/Parameter';
import {UnitFactory} from '../UnitFactory';
import {UnitRequest} from '../UnitRequest';


export class MethodInvoker {
    private readonly _factory: UnitFactory;


    public constructor(factory: UnitFactory) {
        this._factory = factory;
    }


    public async invoke(request: UnitRequest<object>, self: object, method: Method): Promise<any> {
        const args: any[] = await this.getArguments(request, method.parameters);

        return method.invoke(self, args);
    }


    public async getArguments(request: UnitRequest<object>, parameters: ReadOnlyMap<number, Parameter>): Promise<any[]> {
        const args: any[] = [];

        for (const {key, value: parameter} of parameters) {
            const parameterType: Type<any> | undefined = parameter.type;

            if (parameterType != null) {
                args[key] = await this._factory.getUnit(request.next(parameterType));
            }
        }

        return args;
    }
}
