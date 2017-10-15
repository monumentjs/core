import {Inject} from '../../../../Source/DI/Decorators/Inject';
import {UnitFactory} from '../../../../Source/DI/Unit/UnitFactory';
import {InheritConstructorArguments} from '../../../../Source/DI/Decorators/InheritConstructorArguments';


/* tslint:disable:max-classes-per-file */

// Simple class

class ClassA {
    public a: string = 'ClassA';
}

// Class with injection via accessor (using setter)

class ClassB extends ClassA {
    private _b: ClassA;

    @Inject(ClassA)
    public set b(value: ClassA) {
        this._b = value;
    }

    public get b(): ClassA {
        return this._b;
    }
}

// Class with injection via property

class ClassC extends ClassB {
    @Inject(ClassB)
    public c: ClassB;
}

// Yet another class with injection via property

class ClassD extends ClassC {
    @Inject(ClassC)
    public d: ClassC;
}

// Injection via constructor

class ComplexClass extends ClassD {
    public constructor(
        @Inject(ClassD)
        public readonly complex: ClassD
    ) {
        super();
    }
}

// Injection via parent's constructor

@InheritConstructorArguments()
class ComplexService extends ComplexClass {
    public getComplexity(): number {
        return 100;
    }
}

/* tslint:enable:max-classes-per-file */


describe(`UnitFactory`, () => {
    const factory = new UnitFactory();


    describe(`getUnit()`, () => {
        it(`creates correctly configured objects`, () => {
            const a: ClassA = factory.getUnit(ClassA);
            const b: ClassB = factory.getUnit(ClassB);
            const c: ClassC = factory.getUnit(ClassC);
            const d: ClassD = factory.getUnit(ClassD);
            const complex: ComplexClass = factory.getUnit(ComplexClass);
            const service: ComplexService = factory.getUnit(ComplexService);


            expect(a).toBeInstanceOf(ClassA);
            expect(a.a).toBe('ClassA');

            expect(b).toBeInstanceOf(ClassB);
            expect(b.a).toBe('ClassA');
            expect(b.b).toBeInstanceOf(ClassA);
            expect(b.b.a).toBe('ClassA');

            expect(c).toBeInstanceOf(ClassC);
            expect(c.a).toBe('ClassA');

            expect(c.b).toBeInstanceOf(ClassA);
            expect(c.b.a).toBe('ClassA');
            expect(c.c).toBeInstanceOf(ClassB);
            expect(c.c.a).toBe('ClassA');
            expect(c.c.b).toBeInstanceOf(ClassA);
            expect(c.c.b.a).toBe('ClassA');
            expect(d).toBeInstanceOf(ClassD);
            expect(d.a).toBe('ClassA');

            expect(d.b).toBeInstanceOf(ClassA);
            expect(d.b.a).toBe('ClassA');
            expect(d.c).toBeInstanceOf(ClassB);
            expect(d.c.a).toBe('ClassA');
            expect(d.c.b).toBeInstanceOf(ClassA);
            expect(d.c.b.a).toBe('ClassA');
            expect(d.d).toBeInstanceOf(ClassC);
            expect(d.d.a).toBe('ClassA');
            expect(d.d.b).toBeInstanceOf(ClassA);
            expect(d.d.b.a).toBe('ClassA');
            expect(d.d.c).toBeInstanceOf(ClassB);
            expect(d.d.c.a).toBe('ClassA');
            expect(d.d.c.b).toBeInstanceOf(ClassA);
            expect(d.d.c.b.a).toBe('ClassA');

            expect(complex).toBeInstanceOf(ClassD);
            expect(complex.a).toBe('ClassA');
            expect(complex.b).toBeInstanceOf(ClassA);
            expect(complex.b.a).toBe('ClassA');
            expect(complex.c).toBeInstanceOf(ClassB);
            expect(complex.c.a).toBe('ClassA');
            expect(complex.c.b).toBeInstanceOf(ClassA);
            expect(complex.c.b.a).toBe('ClassA');
            expect(complex.d).toBeInstanceOf(ClassC);
            expect(complex.d.a).toBe('ClassA');
            expect(complex.d.b).toBeInstanceOf(ClassA);
            expect(complex.d.b.a).toBe('ClassA');
            expect(complex.d.c).toBeInstanceOf(ClassB);
            expect(complex.d.c.a).toBe('ClassA');
            expect(complex.d.c.b).toBeInstanceOf(ClassA);
            expect(complex.d.c.b.a).toBe('ClassA');
            expect(complex.complex).toBeInstanceOf(ClassC);
            expect(complex.complex.a).toBe('ClassA');
            expect(complex.complex.b).toBeInstanceOf(ClassA);
            expect(complex.complex.b.a).toBe('ClassA');
            expect(complex.complex.c).toBeInstanceOf(ClassB);
            expect(complex.complex.c.a).toBe('ClassA');
            expect(complex.complex.c.b).toBeInstanceOf(ClassA);
            expect(complex.complex.c.b.a).toBe('ClassA');
            expect(complex.complex.d).toBeInstanceOf(ClassC);
            expect(complex.complex.d.a).toBe('ClassA');
            expect(complex.complex.d.b).toBeInstanceOf(ClassA);
            expect(complex.complex.d.b.a).toBe('ClassA');
            expect(complex.complex.d.c).toBeInstanceOf(ClassB);
            expect(complex.complex.d.c.a).toBe('ClassA');
            expect(complex.complex.d.c.b).toBeInstanceOf(ClassA);
            expect(complex.complex.d.c.b.a).toBe('ClassA');

            expect(service).toBeInstanceOf(ClassD);
            expect(service.a).toBe('ClassA');
            expect(service.b).toBeInstanceOf(ClassA);
            expect(service.b.a).toBe('ClassA');
            expect(service.c).toBeInstanceOf(ClassB);
            expect(service.c.a).toBe('ClassA');
            expect(service.c.b).toBeInstanceOf(ClassA);
            expect(service.c.b.a).toBe('ClassA');
            expect(service.d).toBeInstanceOf(ClassC);
            expect(service.d.a).toBe('ClassA');
            expect(service.d.b).toBeInstanceOf(ClassA);
            expect(service.d.b.a).toBe('ClassA');
            expect(service.d.c).toBeInstanceOf(ClassB);
            expect(service.d.c.a).toBe('ClassA');
            expect(service.d.c.b).toBeInstanceOf(ClassA);
            expect(service.d.c.b.a).toBe('ClassA');
            expect(service.complex).toBeInstanceOf(ClassC);
            expect(service.complex.a).toBe('ClassA');
            expect(service.complex.b).toBeInstanceOf(ClassA);
            expect(service.complex.b.a).toBe('ClassA');
            expect(service.complex.c).toBeInstanceOf(ClassB);
            expect(service.complex.c.a).toBe('ClassA');
            expect(service.complex.c.b).toBeInstanceOf(ClassA);
            expect(service.complex.c.b.a).toBe('ClassA');
            expect(service.complex.d).toBeInstanceOf(ClassC);
            expect(service.complex.d.a).toBe('ClassA');
            expect(service.complex.d.b).toBeInstanceOf(ClassA);
            expect(service.complex.d.b.a).toBe('ClassA');
            expect(service.complex.d.c).toBeInstanceOf(ClassB);
            expect(service.complex.d.c.a).toBe('ClassA');
            expect(service.complex.d.c.b).toBeInstanceOf(ClassA);
            expect(service.complex.d.c.b.a).toBe('ClassA');
            expect(service.getComplexity()).toBe(100);
        });


        it(`returns the same instance if class decorated with @Service`, () => {
            const instance1: ComplexService = factory.getUnit(ComplexService);
            const instance2: ComplexService = factory.getUnit(ComplexService);

            expect(instance1).toBe(instance2);
            expect(instance1.a).toBe(instance2.a);
            expect(instance1.b).toBe(instance2.b);
            expect(instance1.c).toBe(instance2.c);
            expect(instance1.d).toBe(instance2.d);
            expect(instance1.complex).toBe(instance2.complex);
            expect(instance1.getComplexity()).toBe(instance2.getComplexity());
        });
    });
});
