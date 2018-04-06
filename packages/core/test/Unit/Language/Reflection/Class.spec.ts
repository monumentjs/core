import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {Test} from '../../../../../test-drive/Decorators/TestConfiguration';
import {Case} from '../../../../../test-drive/Decorators/Case';


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


@Test()
export class ClassSpec {
    protected klass: Class;

    protected attributeA = new Key();
    protected attributeB = new Key();
    protected attributeC = new Key();
    protected attributeD = new Key();


    @Case()
    public 'attributes `type`, `superClass`, `name`'() {
        this.klass = Class.of(ClassD);

        expect(this.klass.name).toBe('ClassD');
        expect(this.klass.type).toBe(ClassD);
        expect(this.klass.prototype).toBe(ClassD.prototype);
        expect(this.klass.superClass).toBeInstanceOf(Class);
        expect((this.klass.superClass as Class).type).toBe(ClassC);

        this.klass = this.klass.superClass as Class;

        expect(this.klass.name).toBe('ClassC');
        expect(this.klass.type).toBe(ClassC);
        expect(this.klass.prototype).toBe(ClassC.prototype);
        expect(this.klass.superClass).toBeInstanceOf(Class);
        expect((this.klass.superClass as Class).type).toBe(ClassB);

        this.klass = this.klass.superClass as Class;

        expect(this.klass.name).toBe('ClassB');
        expect(this.klass.type).toBe(ClassB);
        expect(this.klass.prototype).toBe(ClassB.prototype);
        expect(this.klass.superClass).toBeInstanceOf(Class);
        expect((this.klass.superClass as Class).type).toBe(ClassA);

        this.klass = this.klass.superClass as Class;

        expect(this.klass.name).toBe('ClassA');
        expect(this.klass.type).toBe(ClassA);
        expect(this.klass.prototype).toBe(ClassA.prototype);
        expect(this.klass.superClass).toBeInstanceOf(Class);
        expect((this.klass.superClass as Class).type).toBe(Object);

        this.klass = this.klass.superClass as Class;

        expect(this.klass.name).toBe('Object');
        expect(this.klass.type).toBe(Object);
        expect(this.klass.prototype).toBe(Object.prototype);
        expect(this.klass.superClass).toBeUndefined();
    }


    @Case()
    public 'metadata inheritance'() {
        const classA = Class.of(ClassA);
        expect(classA.hasAttribute(this.attributeA)).toBe(false);
        expect(classA.hasOwnOrInheritedAttribute(this.attributeA)).toBe(false);
        classA.setAttribute(this.attributeA, 'CLASS_A');

        const classB = Class.of(ClassB);
        expect(classB.hasAttribute(this.attributeB)).toBe(false);
        expect(classB.hasOwnOrInheritedAttribute(this.attributeB)).toBe(false);
        classB.setAttribute(this.attributeB, 'CLASS_B');

        const classC = Class.of(ClassC);
        expect(classC.hasAttribute(this.attributeC)).toBe(false);
        expect(classC.hasOwnOrInheritedAttribute(this.attributeC)).toBe(false);
        classC.setAttribute(this.attributeC, 'CLASS_C');

        const classD = Class.of(ClassD);
        expect(classD.hasAttribute(this.attributeD)).toBe(false);
        expect(classD.hasOwnOrInheritedAttribute(this.attributeD)).toBe(false);
        classD.setAttribute(this.attributeD, 'CLASS_D');

        // ClassA attributes

        expect(classA.hasAttribute(this.attributeA)).toBe(true);
        expect(classA.getAttribute(this.attributeA)).toBe('CLASS_A');
        expect(classA.hasOwnOrInheritedAttribute(this.attributeA)).toBe(true);
        expect(classA.getOwnOrInheritedAttribute(this.attributeA)).toBe('CLASS_A');

        expect(classA.hasAttribute(this.attributeB)).toBe(false);
        expect(classA.getAttribute(this.attributeB)).toBeUndefined();
        expect(classA.hasOwnOrInheritedAttribute(this.attributeB)).toBe(false);
        expect(classA.getOwnOrInheritedAttribute(this.attributeB)).toBeUndefined();

        expect(classA.hasAttribute(this.attributeC)).toBe(false);
        expect(classA.getAttribute(this.attributeC)).toBeUndefined();
        expect(classA.hasOwnOrInheritedAttribute(this.attributeC)).toBe(false);
        expect(classA.getOwnOrInheritedAttribute(this.attributeC)).toBeUndefined();

        expect(classA.hasAttribute(this.attributeD)).toBe(false);
        expect(classA.getAttribute(this.attributeD)).toBeUndefined();
        expect(classA.hasOwnOrInheritedAttribute(this.attributeD)).toBe(false);
        expect(classA.getOwnOrInheritedAttribute(this.attributeD)).toBeUndefined();

        // ClassB attributes

        expect(classB.hasAttribute(this.attributeA)).toBe(false);
        expect(classB.getAttribute(this.attributeA)).toBeUndefined();
        expect(classB.hasOwnOrInheritedAttribute(this.attributeA)).toBe(true);
        expect(classB.getOwnOrInheritedAttribute(this.attributeA)).toBe('CLASS_A');

        expect(classB.hasAttribute(this.attributeB)).toBe(true);
        expect(classB.getAttribute(this.attributeB)).toBe('CLASS_B');
        expect(classB.hasOwnOrInheritedAttribute(this.attributeB)).toBe(true);
        expect(classB.getOwnOrInheritedAttribute(this.attributeB)).toBe('CLASS_B');

        expect(classB.hasAttribute(this.attributeC)).toBe(false);
        expect(classB.getAttribute(this.attributeC)).toBeUndefined();
        expect(classB.hasOwnOrInheritedAttribute(this.attributeC)).toBe(false);
        expect(classB.getOwnOrInheritedAttribute(this.attributeC)).toBeUndefined();

        expect(classB.hasAttribute(this.attributeD)).toBe(false);
        expect(classB.getAttribute(this.attributeD)).toBeUndefined();
        expect(classB.hasOwnOrInheritedAttribute(this.attributeD)).toBe(false);
        expect(classB.getOwnOrInheritedAttribute(this.attributeD)).toBeUndefined();

        // ClassC attributes

        expect(classC.hasAttribute(this.attributeA)).toBe(false);
        expect(classC.getAttribute(this.attributeA)).toBeUndefined();
        expect(classC.hasOwnOrInheritedAttribute(this.attributeA)).toBe(true);
        expect(classC.getOwnOrInheritedAttribute(this.attributeA)).toBe('CLASS_A');

        expect(classC.hasAttribute(this.attributeB)).toBe(false);
        expect(classC.getAttribute(this.attributeB)).toBeUndefined();
        expect(classC.hasOwnOrInheritedAttribute(this.attributeB)).toBe(true);
        expect(classC.getOwnOrInheritedAttribute(this.attributeB)).toBe('CLASS_B');

        expect(classC.hasAttribute(this.attributeC)).toBe(true);
        expect(classC.getAttribute(this.attributeC)).toBe('CLASS_C');
        expect(classC.hasOwnOrInheritedAttribute(this.attributeC)).toBe(true);
        expect(classC.getOwnOrInheritedAttribute(this.attributeC)).toBe('CLASS_C');

        expect(classC.hasAttribute(this.attributeD)).toBe(false);
        expect(classC.getAttribute(this.attributeD)).toBeUndefined();
        expect(classC.hasOwnOrInheritedAttribute(this.attributeD)).toBe(false);
        expect(classC.getOwnOrInheritedAttribute(this.attributeD)).toBeUndefined();

        // ClassD attributes

        expect(classD.hasAttribute(this.attributeA)).toBe(false);
        expect(classD.getAttribute(this.attributeA)).toBeUndefined();
        expect(classD.hasOwnOrInheritedAttribute(this.attributeA)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(this.attributeA)).toBe('CLASS_A');

        expect(classD.hasAttribute(this.attributeB)).toBe(false);
        expect(classD.getAttribute(this.attributeB)).toBeUndefined();
        expect(classD.hasOwnOrInheritedAttribute(this.attributeB)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(this.attributeB)).toBe('CLASS_B');

        expect(classD.hasAttribute(this.attributeC)).toBe(false);
        expect(classD.getAttribute(this.attributeC)).toBeUndefined();
        expect(classD.hasOwnOrInheritedAttribute(this.attributeC)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(this.attributeC)).toBe('CLASS_C');

        expect(classD.hasAttribute(this.attributeD)).toBe(true);
        expect(classD.getAttribute(this.attributeD)).toBe('CLASS_D');
        expect(classD.hasOwnOrInheritedAttribute(this.attributeD)).toBe(true);
        expect(classD.getOwnOrInheritedAttribute(this.attributeD)).toBe('CLASS_D');
    }


    @Case()
    public 'own properties reflection'() {
        this.klass = Class.of(ClassD);

        const properties: ReadOnlyMap<PropertyKey, Property> = this.klass.declaredProperties;

        expect(properties).toBeInstanceOf(PropertyMap);
        expect(properties.length).toBe(2);
        expect(properties.get('constructor')).toBeInstanceOf(Property);
        expect(properties.get('propertyOfClassD')).toBeInstanceOf(Property);

        let property: Property = this.klass.getOwnInstanceProperty('propertyOfClassD');

        expect(property.name).toBe('propertyOfClassD');
        expect(property.isAccessor).toBe(true);

        property.setAttribute(this.attributeD, 'Property Attribute');

        this.klass = Class.of(ClassD);
        property = this.klass.getOwnInstanceProperty('propertyOfClassD');

        expect(property.getAttribute(this.attributeD)).toBe('Property Attribute');
    }
}
