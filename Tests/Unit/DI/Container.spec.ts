import {Container} from '../../../Source/DI/Container';
import {ProvidersRegistryException} from '../../../Source/DI/ProvidersRegistryException';
import {ConstructorException} from '../../../Source/DI/ConstructorException';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';

/* tslint:disable:max-classes-per-file */
class ClassWithSimpleConstructor {
    public readonly publicProperty: string;

    public constructor() {
        this.publicProperty = 'public';
    }
}


class ClassWithSimpleConstructorMock {
    public readonly publicProperty: string;

    public constructor() {
        this.publicProperty = 'mock';
    }
}


class ClassWithComplexConstructor {
    public readonly publicProperty: ClassWithSimpleConstructor;

    public constructor(simple: ClassWithSimpleConstructor) {
        this.publicProperty = simple;
    }
}
/* tslint:enable:max-classes-per-file */


describe(`Container`, () => {
    let container: Container;


    beforeEach(() => {
        container = new Container();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of Container`, () => {
            expect(container).toBeInstanceOf(Container);
        });
    });


    describe(`#register()`, () => {
        it(`throws if 'type' argument`, () => {
            container.register(ClassWithSimpleConstructor, {});
        });

        it('registers new type', () => {
            container.register(ClassWithSimpleConstructor, {});
        });

        it('throws if attempting to register same type again', () => {
            container.register(ClassWithSimpleConstructor, {});

            expect(() => {
                container.register(ClassWithSimpleConstructor, {});
            }).toThrow(ProvidersRegistryException);
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
                }).toThrow(ConstructorException);
            });
        });


        describe(`with registration`, () => {
            it(`creates instance of type with complex constructor`, () => {
                container.register(ClassWithComplexConstructor, {
                    providers: [
                        ClassWithSimpleConstructor
                    ]
                });

                const instance = container.get(ClassWithComplexConstructor);

                expect(instance).toBeInstanceOf(ClassWithComplexConstructor);
                expect(instance.publicProperty.publicProperty).toBe('public');
            });
        });

        it(`returns the same instance of type if type registered as singleton`, () => {
            container.register(ClassWithComplexConstructor, {
                isSingleton: true,
                providers: [
                    ClassWithSimpleConstructor
                ]
            });

            const instance1 = container.get(ClassWithComplexConstructor);
            const instance2 = container.get(ClassWithComplexConstructor);

            expect(instance1).toBeInstanceOf(ClassWithComplexConstructor);
            expect(instance1.publicProperty.publicProperty).toBe('public');

            expect(instance2).toBeInstanceOf(ClassWithComplexConstructor);
            expect(instance2.publicProperty.publicProperty).toBe('public');

            expect(instance1).toBe(instance2);
        });
    });


    describe(`#replace()`, () => {
        it(`replaces type provider`, () => {
            container.register(ClassWithSimpleConstructor, {});

            container.register(ClassWithComplexConstructor, {
                providers: [
                    ClassWithSimpleConstructor
                ]
            });

            const normalInstance = container.get(ClassWithComplexConstructor);

            expect(container.get(ClassWithSimpleConstructor)).toBeInstanceOf(ClassWithSimpleConstructor);
            expect(normalInstance).toBeInstanceOf(ClassWithComplexConstructor);
            expect(normalInstance.publicProperty).toBeInstanceOf(ClassWithSimpleConstructor);

            container.replace(ClassWithSimpleConstructor, ClassWithSimpleConstructorMock, {});

            const mockedInstance = container.get(ClassWithComplexConstructor);

            expect(container.get(ClassWithSimpleConstructor)).toBeInstanceOf(ClassWithSimpleConstructorMock);
            expect(mockedInstance).toBeInstanceOf(ClassWithComplexConstructor);
            expect(mockedInstance.publicProperty).toBeInstanceOf(ClassWithSimpleConstructorMock);
        });
    });
});
