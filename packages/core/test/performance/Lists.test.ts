import {ArrayList, Benchmark, times} from '../..';

xdescribe('ArrayList vs Array', () => {
    describe('ArrayList.add() vs Array.push() for 1.000.000 elements', () => {
        it('should be faster than Array.push', function () {
            times(1000, () => {
                const arrayList = new ArrayList();
                const array = [];

                const arrayTime = Benchmark.repeat(1_000_000, (i) => {
                    array.push(i);
                });

                const arrayListTime = Benchmark.repeat(1_000_000, (i) => {
                    arrayList.add(i);
                });

                expect(arrayListTime).toBeLessThan(arrayTime);
            });
        });
    });
});
