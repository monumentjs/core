import {Type} from '@monument/core/main/Type';
import {ReadOnlySet} from '../../../../../collections/main/ReadOnlySet';
import {ReadOnlyMap} from '../../../../../collections/main/ReadOnlyMap';
import {MapIteratorFunction} from '../../../../../collections/main/MapIteratorFunction';
import {Set} from '../../../../../collections/main/Set';
import {Map} from '../../../../../collections/main/Map';
import {ListSet} from '@monument/collections/main/ListSet';
import {ListMap} from '@monument/collections/main/ListMap';
import {Class} from '@monument/reflection/main/Class';
import {UnitDefinition} from '../../UnitDefinition';
import {UnitDefinitionRegistry} from '../../UnitDefinitionRegistry';
import {NoSuchUnitDefinitionException} from '../../../../main/unit/NoSuchUnitDefinitionException';
import {ConfigurableListableUnitFactory} from '../configuration/ConfigurableListableUnitFactory';
import {UnitPostProcessor} from '../../../../unit/factory/configuration/UnitPostProcessor';
import {UnitFactory} from '../UnitFactory';
import {DefaultSingletonUnitRegistry} from './DefaultSingletonUnitRegistry';
import {UnitNameGenerator} from './UnitNameGenerator';
import {DefaultUnitNameGenerator} from './DefaultUnitNameGenerator';


/**
 * Default implementation of the ListableUnitFactory and UnitDefinitionRegistry interfaces:
 * a full-fledged unit factory based on unit definition objects.
 * Typical usage is registering all unit definitions first (possibly read from a unit definition file),
 * before accessing beans.
 * unit definition lookup is therefore an inexpensive operation in a local unit definition table,
 * operating on pre-built unit definition metadata objects.
 *
 * Can be used as a standalone unit factory, or as a superclass for custom unit factories.
 * Note that readers for specific unit definition formats are typically implemented separately rather than
 * as unit factory subclasses: see for example PropertiesUnitDefinitionReader and XmlUnitDefinitionReader.
 */
export class DefaultListableUnitFactory
    extends DefaultSingletonUnitRegistry
    implements ConfigurableListableUnitFactory, UnitDefinitionRegistry {

    private _parentUnitFactory: UnitFactory | undefined;
    private _unitNameGenerator: UnitNameGenerator = new DefaultUnitNameGenerator();
    private readonly _postProcessors: Set<UnitPostProcessor> = new ListSet();
    private readonly _definitions: Map<string, UnitDefinition> = new ListMap();


    public get unitNameGenerator(): UnitNameGenerator {
        return this._unitNameGenerator;
    }


    public set unitNameGenerator(value: UnitNameGenerator) {
        this._unitNameGenerator = value;
    }


    public get unitDefinitionCount(): number {
        return this._definitions.length;
    }


    public get unitDefinitionNames(): ReadOnlySet<string> {
        return this._definitions.keys;
    }


    public set parentUnitFactory(value: UnitFactory | undefined) {
        this._parentUnitFactory = value;
    }


    public get parentUnitFactory(): UnitFactory | undefined {
        return this._parentUnitFactory;
    }


    public get unitPostProcessorsCount(): number {
        return this._postProcessors.length;
    }


    public constructor(parentUnitFactory?: UnitFactory) {
        super();

        this._parentUnitFactory = parentUnitFactory;
    }


    // ListableUnitFactory

    public getUnitNamesOfType(type: Class): ReadOnlySet<string> {
        let names: Set<string> = new ListSet();

        for (let {key, value} of this._definitions) {
            if (value.unitClass === type || value.unitClass.isSubClassOf(type)) {
                names.add(key);
            }
        }

        return names;
    }


    // ConfigurableUnitFactory

    public addUnitPostProcessor(postProcessor: UnitPostProcessor): void {
        this._postProcessors.add(postProcessor);
    }


    public async destroyUnit(unitName: string, unitInstance: object): Promise<void> {
        let definition: UnitDefinition = this.getUnitDefinition(unitName);

        if (definition.destroyMethodName != null) {
            await (unitInstance as any)[definition.destroyMethodName]();
        }
    }


    // HierarchicalUnitFactory

    public containsLocalUnit(unitName: string): boolean {
        return this._definitions.containsKey(unitName);
    }


    // UnitFactory

    public containsUnit(unitName: string): boolean {
        if (this.containsLocalUnit(unitName)) {
            return true;
        }

        if (this.parentUnitFactory && this.parentUnitFactory.containsUnit(unitName)) {
            return true;
        }

        return false;
    }


    public getType(unitName: string): Type {
        let definition: UnitDefinition = this.getUnitDefinition(unitName);

        return definition.unitClass.type;
    }


    public async getUnitByName(unitName: string): Promise<object> {
        if (this.containsLocalUnit(unitName)) {
            let unitDefinition: UnitDefinition = this.getUnitDefinition(unitName);

            return this.getUnitByDefinition(unitName, unitDefinition);
        }

        if (this.parentUnitFactory != null) {
            return this.parentUnitFactory.getUnitByName(unitName);
        }

        throw new NoSuchUnitDefinitionException(`Definition for unit "${unitName}" not found in this registry.`);
    }


    public getUnitByType<T>(type: Type<T>): Promise<T> {
        let klass: Class = Class.of(type);
        let unitName: string;

        // TODO: get definition with highest priority
        let definition: UnitDefinition | undefined = this.findUnitDefinition((candidate: UnitDefinition, candidateName: string): boolean => {
            unitName = candidateName;

            return candidate.unitClass === klass || candidate.unitClass.isSubClassOf(klass);
        });

        if (definition == null) {
            definition = new UnitDefinition(klass);

            definition.scope = UnitDefinition.PROTOTYPE_SCOPE;

            unitName = this.unitNameGenerator.generateUnitName(definition, this);

            this.registerUnitDefinition(unitName, definition);
        }

        return this.getUnitByDefinition(unitName, definition) as any;
    }


    public isPrototype(unitName: string): boolean {
        let definition: UnitDefinition = this.getUnitDefinition(unitName);

        return definition.isPrototype;
    }


    public isSingleton(unitName: string): boolean {
        let definition: UnitDefinition = this.getUnitDefinition(unitName);

        return definition.isSingleton;
    }


    public isTypeMatch(unitName: string, unitType: Type): boolean {
        let definition: UnitDefinition = this.getUnitDefinition(unitName);

        return definition.unitClass.type === unitType;
    }


    // UnitDefinitionRegistry

    public containsUnitDefinition(unitName: string): boolean {
        return this._definitions.containsKey(unitName);
    }


    public findUnitDefinition(
        filter: MapIteratorFunction<string, UnitDefinition, boolean>
    ): UnitDefinition | undefined {
        for (let {key, value} of this._definitions) {
            if (filter(value, key)) {
                return value;
            }
        }

        return undefined;
    }


    public findUnitDefinitions(
        filter: MapIteratorFunction<string, UnitDefinition, boolean>
    ): ReadOnlyMap<string, UnitDefinition> {
        let definitions: Map<string, UnitDefinition> = new ListMap();

        for (let {key, value} of this._definitions) {
            if (filter(value, key)) {
                definitions.put(key, value);
            }
        }

        return definitions;
    }


    public getUnitDefinition(unitName: string): UnitDefinition {
        let definition: UnitDefinition | undefined = this._definitions.get(unitName);

        if (definition == null) {
            throw new NoSuchUnitDefinitionException(`Definition for unit "${unitName}" not found in this registry.`);
        }

        return definition;
    }


    public isUnitNameInUse(unitName: string): boolean {
        return this._definitions.containsKey(unitName);
    }


    public registerUnitDefinition(unitName: string, unitDefinition: UnitDefinition): void {
        this._definitions.put(unitName, unitDefinition);
    }


    public removeUnitDefinition(unitName: string): void {
        this._definitions.remove(unitName);
    }


    private async getUnitByDefinition(unitName: string, unitDefinition: UnitDefinition): Promise<object> {
        let args: object[] = [];
        let constructorParameterTypes: Type[] | undefined = unitDefinition.unitClass.constructorParameters;

        if (constructorParameterTypes != null) {
            args = await Promise.all(constructorParameterTypes.map((type) => {
                return this.getUnitByType(type);
            }));
        }

        let instance: object = unitDefinition.unitClass.instantiate(...args);

        for (let postProcessor of this._postProcessors) {
            instance = await postProcessor.postProcessBeforeInitialization(instance, unitName);
        }

        if (unitDefinition.initMethodName != null) {
            await (instance as any)[unitDefinition.initMethodName]();
        }

        for (let postProcessor of this._postProcessors) {
            instance = await postProcessor.postProcessAfterInitialization(instance, unitName);
        }

        for (let methodName of unitDefinition.postConstructMethodNames) {
            await (instance as any)[methodName]();
        }

        return instance;
    }

}
