import {Container} from '../../../../Source/DI/Container/Container';
import {MissingConstructorArgumentsException} from '../../../../Source/DI/Container/MissingConstructorArgumentsException';
import {Unit} from '../../../../Source/DI/Decorators/Unit';
import {Inject} from '../../../../Source/DI/Decorators/Inject';

/* tslint:disable:max-classes-per-file */
class ClassA {

}


class ClassB {
    @Inject(ClassA)
    public propertyOfClassB: ClassA;
}


class ClassC extends ClassB {
    @Inject(ClassA)
    public propertyOfClassC: ClassA;
}


class ClassD extends ClassC {
    @Inject(ClassB)
    public propertyOfClassD: ClassB;
}


class ClassWithSimpleConstructor {
    public readonly publicProperty: string = 'public';
}


class ClassWithComplexConstructor {
    public readonly publicProperty: ClassWithSimpleConstructor;

    public constructor(simple: ClassWithSimpleConstructor) {
        this.publicProperty = simple;
    }
}
/* tslint:enable:max-classes-per-file */


describe(`Container`, () => {
    describe(`#get()`, () => {
        describe('inheritance', () => {

            it(`preserves @Inject'ed properties of superclasses`, () => {
                const b: ClassB = Container.get(ClassB);
                const c: ClassC = Container.get(ClassC);
                const d: ClassD = Container.get(ClassD);

                expect(b.propertyOfClassB).toBeInstanceOf(ClassA);
                expect((b as ClassC).propertyOfClassC).not.toBeInstanceOf(ClassA);

                expect(c.propertyOfClassB).toBeInstanceOf(ClassA);
                expect(c.propertyOfClassC).toBeInstanceOf(ClassA);

                expect(d.propertyOfClassB).toBeInstanceOf(ClassA);
                expect(d.propertyOfClassC).toBeInstanceOf(ClassA);
                expect(d.propertyOfClassD).toBeInstanceOf(ClassB);
                expect(d.propertyOfClassD.propertyOfClassB).toBeInstanceOf(ClassA);
            });
        });

        describe(`without registration`, () => {
            it(`creates an instance of type with simple constructor`, () => {
                const instance = Container.get(ClassWithSimpleConstructor);

                expect(instance).toBeInstanceOf(ClassWithSimpleConstructor);
                expect(instance.publicProperty).toBe('public');
            });

            it(`throws if type constructor has required arguments`, () => {
                expect(() => {
                    return Container.get(ClassWithComplexConstructor);
                }).toThrow(MissingConstructorArgumentsException);
            });
        });


        describe(`with registration`, () => {
            it(`creates instance of type with complex constructor`, () => {
                Unit({
                    providers: [
                        ClassWithSimpleConstructor
                    ]
                })(ClassWithComplexConstructor);

                const instance = Container.get(ClassWithComplexConstructor);

                expect(instance).toBeInstanceOf(ClassWithComplexConstructor);
                expect(instance.publicProperty.publicProperty).toBe('public');
            });
        });

        it(`returns the same instance of type if type registered as singleton`, () => {
            Unit({
                isSingleton: true,
                providers: [
                    ClassWithSimpleConstructor
                ]
            })(ClassWithComplexConstructor);

            const instance1 = Container.get(ClassWithComplexConstructor);
            const instance2 = Container.get(ClassWithComplexConstructor);

            expect(instance1).toBeInstanceOf(ClassWithComplexConstructor);
            expect(instance1.publicProperty.publicProperty).toBe('public');

            expect(instance2).toBeInstanceOf(ClassWithComplexConstructor);
            expect(instance2.publicProperty.publicProperty).toBe('public');

            expect(instance1).toBe(instance2);
        });
    });
});
