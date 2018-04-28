import {UnitDefinitionRegistry} from '@monument/context/main/unit/UnitDefinitionRegistry';
import {Class} from '@monument/reflection/main/Class';
import {Component} from '@monument/stereotype/main/Component';
import {UnitDefinition} from '@monument/context/main/unit/UnitDefinition';
import {UnitNameGenerator} from '@monument/context/main/unit/factory/support/UnitNameGenerator';
import {Configuration} from '@monument/stereotype/main/Configuration';


export class UnitDefinitionReader {
    private readonly _registry: UnitDefinitionRegistry;
    private readonly _nameGenerator: UnitNameGenerator;


    public constructor(registry: UnitDefinitionRegistry, nameGenerator: UnitNameGenerator) {
        this._registry = registry;
        this._nameGenerator = nameGenerator;
    }


    public scan(klass: Class): void {
        if (klass.isDecoratedWith(Component)) {
            let definition = new UnitDefinition(klass);
            let name = this._nameGenerator.generateUnitName(definition, this._registry);

            this._registry.registerUnitDefinition(name, definition);
        }

        if (klass.isDecoratedWith(Configuration)) {
            let methods = klass.methods;

            for (let method of methods) {
                if (method.isDecoratedWith(Component)) {
                    if (method.returnType != null) {
                        this.scan(Class.of(method.returnType));
                    }
                }
            }
        }
    }
}
