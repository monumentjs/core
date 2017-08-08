import {Container} from '../../../Source/DI/Container/Container';
import {MissingConstructorArgumentsException} from '../../../Source/DI/Container/MissingConstructorArgumentsException';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';
import {Unit} from '../../../Source/DI/Decorators/Unit';

/* tslint:disable:max-classes-per-file */
class ClassWithSimpleConstructor {
    public readonly publicProperty: string;

    public constructor() {
        this.publicProperty = 'public';
    }
}


// class ClassWithSimpleConstructorMock {
//     public readonly publicProperty: string;
//
//     public constructor() {
//         this.publicProperty = 'mock';
//     }
// }


class ClassWithComplexConstructor {
    public readonly publicProperty: ClassWithSimpleConstructor;

    public constructor(simple: ClassWithSimpleConstructor) {
        this.publicProperty = simple;
    }
}
/* tslint:enable:max-classes-per-file */


describe(`Container`, () => {
    let container: Container = Container.instance;


    describe(`#constructor()`, () => {
        it(`creates new instance of Container`, () => {
            expect(container).toBeInstanceOf(Container);
        });
    });


    describe(`#get()`, () => {
        describe(`without registration`, () => {
            it(`throws if 'type' argument is not defined`, () => {
                expect(() => {
                    container.get(null);
                }).toThrow(ArgumentNullException);

                expect(() => {
                    container.get(undefined);
                }).toThrow(ArgumentNullException);
            });

            it(`creates an instance of type with simple constructor`, () => {
                const instance = container.get(ClassWithSimpleConstructor);

                expect(instance).toBeInstanceOf(ClassWithSimpleConstructor);
                expect(instance.publicProperty).toBe('public');
            });

            it(`throws if type constructor has required arguments`, () => {
                expect(() => {
                    return container.get(ClassWithComplexConstructor);
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

                const instance = container.get(ClassWithComplexConstructor);

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

            const instance1 = container.get(ClassWithComplexConstructor);
            const instance2 = container.get(ClassWithComplexConstructor);

            expect(instance1).toBeInstanceOf(ClassWithComplexConstructor);
            expect(instance1.publicProperty.publicProperty).toBe('public');

            expect(instance2).toBeInstanceOf(ClassWithComplexConstructor);
            expect(instance2.publicProperty.publicProperty).toBe('public');

            expect(instance1).toBe(instance2);
        });
    });


    describe(`#instance`, () => {
        it(`returns reference to main instance of DI container`, () => {
            expect(Container.instance).toBeInstanceOf(Container);
        });


        it(`provides reference to main instance during the `, () => {
            expect(Container.instance.get(Container)).toBe(Container.instance);
        });
    });
});
