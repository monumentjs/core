import {IUnitFactory} from './Abstraction/IUnitFactory';
import {UnitDefinition} from './UnitDefinition';
import {IUnitPostProcessor} from './Abstraction/IUnitPostProcessor';
import {List} from '../../Collections/List';
import {CoreType} from '../../Core/Types/CoreType';
import {RuntimeException} from '../../Exceptions/RuntimeException';
import {MissingConstructorArgumentsException} from './MissingConstructorArgumentsException';
import {Class} from '../../Language/Reflection/Class';
import {Parameter} from '../../Language/Reflection/Parameter';
import {Type} from '../../Core/Types/Type';
import {Constructor} from '../../Core/Types/Constructor';
import {IUnitPostProcessorRegistry} from './Abstraction/IUnitPostProcessorRegistry';
import {IPropertyAccess} from '../../Core/Abstraction/IPropertyAccess';


export class UnitFactory implements IUnitFactory, IUnitPostProcessorRegistry {
    private _unitPostProcessors: List<IUnitPostProcessor> = new List();


    public get unitPostProcessorsCount(): number {
        return this._unitPostProcessors.length;
    }


    public registerUnitPostProcessor(postProcessor: Type<IUnitPostProcessor>): void {
        this._unitPostProcessors.add(this.getUnit(postProcessor));
    }


    public getUnit<T>(type: Type<T>): T {
        const unitDefinition: UnitDefinition<T> = UnitDefinition.of(type);

        let instance: T;

        if (unitDefinition.isSingleton) {
            if (unitDefinition.singletonInstance == null) {
                unitDefinition.singletonInstance = this.createNewUnit(unitDefinition);
            }

            instance = unitDefinition.singletonInstance;
        } else {
            instance = this.createNewUnit(unitDefinition);
        }

        return instance;
    }


    private createNewUnit<T>(unitDefinition: UnitDefinition<T>): T {
        const constructor: Constructor<T> = unitDefinition.type;
        const constructorArguments: any[] = this.createConstructorArguments(unitDefinition);
        let unit: T = new constructor(...constructorArguments);

        this.populateProperties(unit, unitDefinition);

        this.notifyUnitNameAware(unit, unitDefinition);
        this.notifyUnitFactoryAware(unit, unitDefinition);
        this.notifyApplicationContextAware(unit, unitDefinition);

        unit = this.postProcessBeforeInitialization(unit, unitDefinition);

        this.notifyPropertiesPopulated(unit, unitDefinition);
        this.callInitMethod(unit, unitDefinition);

        unit = this.postProcessAfterInitialization(unit, unitDefinition);

        return unit;
    }


    private populateProperties<T>(unit: T, unitDefinition: UnitDefinition<T>): void {
        for (let {key, value} of unitDefinition.getOwnAndInheritedPropertyValues()) {
            (unit as IPropertyAccess<any>)[key] = this.getUnit(value);
        }
    }


    private postProcessBeforeInitialization<T>(unit: T, unitDefinition: UnitDefinition<T>): T {
        for (let postProcessor of this._unitPostProcessors) {
            unit = postProcessor.postProcessBeforeInitialization(unit, unitDefinition);
        }

        return unit;
    }


    private postProcessAfterInitialization<T>(unit: T, unitDefinition: UnitDefinition<T>): T {
        for (let postProcessor of this._unitPostProcessors) {
            unit = postProcessor.postProcessAfterInitialization(unit, unitDefinition);
        }

        return unit;
    }


    private notifyUnitNameAware<T>(unit: any, unitDefinition: UnitDefinition<T>): void {
        if (unitDefinition.isUnitNameAware) {
            if (typeof unit.setUnitName !== CoreType.Function) {
                throw new RuntimeException(`Unit marked as unit name aware but does not implement IUnitNameAware interface.`);
            }

            unit.setUnitName(unitDefinition.name);
        }
    }


    private notifyUnitFactoryAware<T>(unit: any, unitDefinition: UnitDefinition<T>): void {
        if (unitDefinition.isUnitFactoryAware) {
            if (typeof unit.setUnitFactory !== CoreType.Function) {
                throw new RuntimeException(`Unit marked as unit factory aware but does not implement IUnitFactoryAware interface.`);
            }

            unit.setUnitFactory(this);
        }
    }


    private notifyApplicationContextAware<T>(unit: any, unitDefinition: UnitDefinition<T>): void {
        if (unitDefinition.isApplicationContextAware) {
            if (typeof unit.setApplicationContext !== CoreType.Function) {
                throw new RuntimeException(`Unit marked as application context aware but does not implement IApplicationContextAware interface.`);
            }

            unit.setUnitFactory(this);
        }
    }


    private notifyPropertiesPopulated<T>(unit: any, unitDefinition: UnitDefinition<T>): void {
        if (unitDefinition.isInitializing) {
            if (typeof unit.afterPropertiesSet !== CoreType.Function) {
                throw new RuntimeException(`Unit marked as initializing but does not implement IInitializingUnit interface.`);
            }

            unit.afterPropertiesSet();
        }
    }


    private callInitMethod<T>(unit: any, unitDefinition: UnitDefinition<T>): void {
        const name: PropertyKey | undefined = unitDefinition.initMethodName;

        if (name != null) {
            if (typeof unit[name] !== CoreType.Function) {
                throw new RuntimeException(
                    `Initializing method "${unitDefinition.initMethodName}" is not defined ` +
                    `in instance of class "${unitDefinition.type.name}".`
                );
            }

            unit[name]();
        }
    }


    private createConstructorArguments(unitDefinition: UnitDefinition): any[] {
        let argumentsDefinitions = unitDefinition.constructorArguments;

        if (unitDefinition.inheritConstructorArguments) {
            let superClass = Class.of(unitDefinition.type).superClass;

            if (superClass != null) {
                let parentDefinition = UnitDefinition.of(superClass.type);

                for (let i = 0; i < parentDefinition.constructorArguments.length; i++) {
                    if (argumentsDefinitions[i] == null) {
                        argumentsDefinitions[i] = parentDefinition.constructorArguments[i];
                    }
                }
            }
        }

        if (argumentsDefinitions.length < unitDefinition.type.length) {
            throw new MissingConstructorArgumentsException(
                unitDefinition.type,
                unitDefinition.constructorArguments.length
            );
        }

        const args: any[] = [];

        for (let index = 0; index < argumentsDefinitions.length; index++) {
            const arg: Parameter<any> | undefined = argumentsDefinitions[index];

            if (arg != null) {
                if (arg.value !== undefined) {
                    args[index] = arg.value;
                } else if (arg.type != null) {
                    args[index] = this.getUnit(arg.type);
                }
            }
        }

        return args;
    }
}
