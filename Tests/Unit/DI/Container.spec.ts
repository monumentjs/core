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

    describe(`#get()`, () => {
        describe(`without registration`, () => {
            it(`throws if 'type' argument is not defined`, () => {
                expect(() => {
                    Container.get(null);
                }).toThrow(ArgumentNullException);

                expect(() => {
                    Container.get(undefined);
                }).toThrow(ArgumentNullException);
            });

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
