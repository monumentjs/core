
/* tslint:disable:no-console */


import {ListableUnitFactory} from '../../../../../DI/Unit/UnitFactory';

class ClassA {
    public a: string = 'AAA';
}

class ClassB extends ClassA {
    public b: ClassA = new ClassA();
}

class ClassC extends ClassB {
    public c: ClassB = new ClassB();
}

class ClassD extends ClassC {
    public d: ClassC = new ClassC();
}


const container = new ListableUnitFactory();

(() => {
    console.log(`getUnit()`);

    for (let round = 1; round <= 10; round++) {
        const start = Date.now();

        for (let i = 0; i < 1000; i++) {
            container.getUnit(ClassD);
        }

        const end = Date.now();
        const duration = end - start;

        console.log(`Round ${round}: ${duration} ms`);
    }

    console.log('');
})();
