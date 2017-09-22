import {IApplicationEntryPoint} from '../Application/Abstraction/IApplicationEntryPoint';
import {Type} from '../Core/Types/Type';
import {UnitFactory} from '../DI/Unit/UnitFactory';


export class ApplicationStarter {
    public static async run(type: Type<IApplicationEntryPoint>): Promise<void> {
        const factory: UnitFactory = new UnitFactory();
        const app: IApplicationEntryPoint = factory.getUnit(type);

        await app.main();
    }
}
