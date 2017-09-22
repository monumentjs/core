import {Class} from '../../../../Source/Language/Reflection/Class';
import {PropertyMap} from '../../../../Source/Language/Reflection/PropertyMap';
import {Property} from '../../../../Source/Language/Reflection/Property';
import {Key} from '../../../../Source/Language/Reflection/Key';
import {IReadOnlyMap} from '../../../../Source/Collections/Abstraction/IReadOnlyMap';


/* tslint:disable:max-classes-per-file */
class ClassA {
    private _propertyOfClassA: string = 'Property';

    public get propertyOfClassA(): string {
        return this._propertyOfClassA;
    }
}

class ClassB extends ClassA {
    private _propertyOfClassB: ClassA = new ClassA();

    public get propertyOfClassB(): ClassA {
        return this._propertyOfClassB;
    }

    public set propertyOfClassB(value: ClassA) {
        this._propertyOfClassB = value;
    }
}

class ClassC extends ClassB {
    private _propertyOfClassC: ClassB = new ClassB();

    public get propertyOfClassC(): ClassB {
        return this._propertyOfClassC;
    }

    public set propertyOfClassC(value: ClassB) {
        this._propertyOfClassC = value;
    }
}

class ClassD extends ClassC {
    private _propertyOfClassD: ClassC = new ClassC();

    public get propertyOfClassD(): ClassC {
        return this._propertyOfClassD;
    }

    public set propertyOfClassD(value: ClassC) {
        this._propertyOfClassD = value;
    }
}
/* tslint:enable:max-classes-per-file */


describe(`Class`, () => {
    let klass: Class;

    const attributeA = new Key();
    const attributeB = new Key();
    const attributeC = new Key();
    const attributeD = new Key();

    test(`attributes 'type', 'superClass', 'name', 'argumentsCount'`, () => {
        klass = Class.of(ClassD);

        expect(klass.name).toBe('ClassD');
        expect(klass.type).toBe(ClassD);
        expect(klass.prototype).toBe(ClassD.prototype);
        expect(klass.constructorArgumentsCount).toBe(0);
        expect(klass.superClass).toBeInstanceOf(Class);
        expect((klass.superClass as Class).type).toBe(ClassC);

        klass = klass.superClass as Class;

        expect(klass.name).toBe('ClassC');
        expect(klass.type).toBe(ClassC);
        expect(klass.prototype).toBe(ClassC.prototype);
        expect(klass.constructorArgumentsCount).toBe(0);
        expect(klass.superClass).toBeInstanceOf(Class);
        expect((klass.superClass as Class).type).toBe(ClassB);

        klass = klass.superClass as Class;

        expect(klass.name).toBe('ClassB');
        expect(klass.type).toBe(ClassB);
        expect(klass.prototype).toBe(ClassB.prototype);
        expect(klass.constructorArgumentsCount).toBe(0);
        expect(klass.superClass).toBeInstanceOf(Class);
        expect((klass.superClass as Class).type).toBe(ClassA);

        klass = klass.superClass as Class;

        expect(klass.name).toBe('ClassA');
        expect(klass.type).toBe(ClassA);
        expect(klass.prototype).toBe(ClassA.prototype);
        expect(klass.constructorArgumentsCount).toBe(0);
        expect(klass.superClass).toBeInstanceOf(Class);
        expect((klass.superClass as Class).type).toBe(Object);

        klass = klass.superClass as Class;

        expect(klass.name).toBe('Object');
        expect(klass.type).toBe(Object);
        expect(klass.prototype).toBe(Object.prototype);
        expect(klass.superClass).toBeUndefined();
    });


    test(`metadata inheritance`, () => {
        const classA = Class.of(ClassA);
        expect(classA.hasAttribute(attributeA)).toBe(false);
        expect(classA.hasOwnOrInheritedAttribute(attributeA)).toBe(false);
        classA.setAttribute(attributeA, 'CLASS_A');

        const classB = Class.of(ClassB);
        expect(classB.hasAttribute(attributeB)).toBe(false);
        expect(classB.hasOwnOrInheritedAttribute(attributeB)).toBe(false);
        classB.setAttribute(attributeB, 'CLASS_B');

        const classC = Class.of(ClassC);
        expect(classC.hasAttribute(attributeC)).toBe(false);
        expect(classC.hasOwnOrInheritedAttribute(attributeC)).toBe(false);
        classC.setAttribute(attributeC, 'CLASS_C');

        const classD = Class.of(ClassD);
        expect(classD.hasAttribute(attributeD)).toBe(false);
        expect(classD.hasOwnOrInheritedAttribute(attributeD)).toBe(false);
        classD.setAttribute(attributeD, 'CLASS_D');

        // ClassA attributes

        expect(classA.hasAttribute(attributeA)).toBe(true);
        expect(classA.getAttribute(attributeA)).toBe('CLASS_A');
        expect(classA.hasOwnOrInheritedAttribute(attributeA)).toBe(true);
        expect(classA.getOwnOrInheritedAttribute(attributeA)).toBe('CLASS_A');

        expect(classA.hasAttribute(attributeB)).toBe(false);
        expect(classA.getAttribute(attributeB)).toBeUndefined();
        expect(classA.hasOwnOrInheritedAttribute(attributeB)).toBe(false);
        expect(classA.getOwnOrInheritedAttribute(attributeB)).toBeUndefined();

        expect(classA.hasAttribute(attributeC)).toBe(false);
        expect(classA.getAttribute(attributeC)).toBeUndefined();
        expect(classA.hasOwnOrInheritedAttribute(attributeC)).toBe(false);
        expect(classA.getOwnOrInheritedAttribute(attributeC)).toBeUndefined();

        expect(classA.hasAttribute(attributeD)).toBe(false);
        expect(classA.getAttribute(attributeD)).toBeUndefined();
        expect(classA.hasOwnOrInheritedAttribute(attributeD)).toBe(false);
        expect(classA.getOwnOrInheritedAttribute(attributeD)).toBeUndefined();

        // ClassB attributes

        expect(classB.hasAttribute(attributeA)).toBe(false);
        expect(classB.getAttribute(attributeA)).toBeUndefined();
        expect(classB.hasOwnOrInheritedAttribute(attributeA)).toBe(true);
        expect(classB.getOwnOrInheritedAttribute(attributeA)).toBe('CLASS_A');

        expect(classB.hasAttribute(attributeB)).toBe(true);
        expect(classB.getAttribute(attributeB)).toBe('CLASS_B');
        expect(classB.hasOwnOrInheritedAttribute(attributeB)).toBe(true);
        expect(classB.getOwnOrInheritedAttribute(attributeB)).toBe('CLASS_B');

        expect(classB.hasAttribute(attributeC)).toBe(false);
        expect(classB.getAttribute(attributeC)).toBeUndefined();
        expect(classB.hasOwnOrInheritedAttribute(attributeC)).toBe(false);
        expect(classB.getOwnOrInheritedAttribute(attributeC)).toBeUndefined();

        expect(classB.hasAttribute(attributeD)).toBe(false);
        expect(classB.getAttribute(attributeD)).toBeUndefined();
        expect(classB.hasOwnOrInheritedAttribute(attributeD)).toBe(false);
        expect(classB.getOwnOrInheritedAttribute(attributeD)).toBeUndefined();

        // ClassC attributes

        expect(classC.hasAttribute(attributeA)).toBe(false);
        expect(classC.getAttribute(attributeA)).toBeUndefined();
        expect(classC.hasOwnOrInheritedAttribute(attributeA)).toBe(true);
        expect(classC.getOwnOrInheritedAttribute(attributeA)).toBe('CLASS_A');

        expect(classC.hasAttribute(attributeB)).toBe(false);
        expect(classC.getAttribute(attributeB)).toBeUndefined();
        expect(classC.hasOwnOrInheritedAttribute(attributeB)).toBe(true);
        expect(classC.getOwnOrInheritedAttribute(attributeB)).toBe('CLASS_B');

        expect(classC.hasAttribute(attributeC)).toBe(true);
        expect(classC.getAttribute(attributeC)).toBe('CLASS_C');
        expect(classC.hasOwnOrInheritedAttribute(attributeC)).toBe(true);
        expect(classC.getOwnOrInheritedAttribute(attributeC)).toBe('CLASS_C');

        expect(classC.hasAttribute(attributeD)).toBe(false);
        expect(classC.getAttribute(attributeD)).toBeUndefined();
        expect(classC.hasOwnOrInheritedAttribute(attributeD)).toBe(false);
        expect(classC.getOwnOrInheritedAttribute(attributeD)).toBeUndefined();

        // ClassD attributes

        expect(classD.hasAttribute(attributeA)).toBe(false);
        expect(classD.getAttribute(attributeA)).toBeUndefined();
        expect(classD.hasOwnOrInheritedAttribute(attributeA)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(attributeA)).toBe('CLASS_A');

        expect(classD.hasAttribute(attributeB)).toBe(false);
        expect(classD.getAttribute(attributeB)).toBeUndefined();
        expect(classD.hasOwnOrInheritedAttribute(attributeB)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(attributeB)).toBe('CLASS_B');

        expect(classD.hasAttribute(attributeC)).toBe(false);
        expect(classD.getAttribute(attributeC)).toBeUndefined();
        expect(classD.hasOwnOrInheritedAttribute(attributeC)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(attributeC)).toBe('CLASS_C');

        expect(classD.hasAttribute(attributeD)).toBe(true);
        expect(classD.getAttribute(attributeD)).toBe('CLASS_D');
        expect(classD.hasOwnOrInheritedAttribute(attributeD)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(attributeD)).toBe('CLASS_D');
    });


    test(`own properties reflection`, () => {
        klass = Class.of(ClassD);

        const properties: IReadOnlyMap<PropertyKey, Property> = klass.ownInstanceProperties;

        expect(properties).toBeInstanceOf(PropertyMap);
        expect(properties.length).toBe(2);
        expect(properties.get('constructor')).toBeInstanceOf(Property);
        expect(properties.get('propertyOfClassD')).toBeInstanceOf(Property);

        let property: Property = klass.getOwnInstanceProperty('propertyOfClassD');

        expect(property.key).toBe('propertyOfClassD');
        expect(property.isAccessor).toBe(true);

        property.setAttribute(attributeD, 'Property Attribute');

        klass = Class.of(ClassD);
        property = klass.getOwnInstanceProperty('propertyOfClassD');

        expect(property.getAttribute(attributeD)).toBe('Property Attribute');

    });
});
