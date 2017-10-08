import {UnitDefinition} from '../../../../Source/DI/Unit/UnitDefinition';


/* tslint:disable:max-classes-per-file */
class BaseClass {
    private _baseProperty: object;


    public get baseProperty(): Object {
        return this._baseProperty;
    }


    public constructor(baseProperty: object) {
        this._baseProperty = baseProperty;
    }
}

class SubClass extends BaseClass {
    private _ownProperty: object;


    public get ownProperty(): Object {
        return this._ownProperty;
    }


    public constructor(baseProperty: object, ownProperty: object) {
        super(baseProperty);

        this._ownProperty = ownProperty;
    }
}
/* tslint:enable:max-classes-per-file */


describe(`UnitDefinition`, () => {
    
    test(`Extraction of unit definition`, () => {
        let base = UnitDefinition.of(BaseClass);
        let sub = UnitDefinition.of(SubClass);

        expect(base.type).toBe(BaseClass);
        expect(typeof base.name).toBe('string');
        expect(base.name.length).toBeGreaterThan(0);
        expect(base.isInitializing).toBe(false);
        expect(base.isSingleton).toBe(false);
        expect(base.isPrototype).toBe(true);
        expect(base.isPrimary).toBe(false);
        expect(base.isUnitNameAware).toBe(false);
        expect(base.isUnitFactoryAware).toBe(false);
        expect(base.isApplicationContextAware).toBe(false);
        expect(base.initMethodName).toBeUndefined();

        expect(sub.type).toBe(SubClass);
        expect(typeof sub.name).toBe('string');
        expect(sub.name.length).toBeGreaterThan(0);
        expect(sub.isInitializing).toBe(false);
        expect(sub.isSingleton).toBe(false);
        expect(sub.isPrototype).toBe(true);
        expect(sub.isPrimary).toBe(false);
        expect(sub.isUnitNameAware).toBe(false);
        expect(sub.isUnitFactoryAware).toBe(false);
        expect(sub.isApplicationContextAware).toBe(false);
        expect(sub.initMethodName).toBeUndefined();

        base.isInitializing = true;

        expect(base.isInitializing).toBe(true);
        expect(sub.isInitializing).toBe(true);

        base.isApplicationContextAware = true;

        expect(base.isApplicationContextAware).toBe(true);
        expect(sub.isApplicationContextAware).toBe(true);

        base.isUnitFactoryAware = true;

        expect(base.isUnitFactoryAware).toBe(true);
        expect(sub.isUnitFactoryAware).toBe(true);

        base.isUnitNameAware = true;

        expect(base.isUnitNameAware).toBe(true);
        expect(sub.isUnitNameAware).toBe(true);

    });
});
