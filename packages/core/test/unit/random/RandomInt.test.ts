import { RandomInt } from '../../..';

describe('RandomInt', function() {
    describe('constructor()', function() {
        it('should initialize with randomly generated value', function() {
            const a = new RandomInt();
            const b = new RandomInt();

            expect(a.toJSON()).toBe(a.value);
            expect(b.toJSON()).toBe(b.value);
            expect(a.toString()).toBe(a.value.toString(10));
            expect(b.toString()).toBe(b.value.toString(10));
        });
    });

    describe('constructor()', function() {
        it('should initialize with randomly generated value with specified lower bound', function() {
            const a = new RandomInt(0);
            const b = new RandomInt(0);

            expect(a.value).toBeGreaterThanOrEqual(0);
            expect(b.value).toBeGreaterThanOrEqual(0);
            expect(a.toJSON()).toBe(a.value);
            expect(b.toJSON()).toBe(b.value);
            expect(a.toString()).toBe(a.value.toString(10));
            expect(b.toString()).toBe(b.value.toString(10));
        });
    });

    describe('constructor()', function() {
        it('should initialize with randomly generated value with specified lower anf upper bound', function() {
            const a = new RandomInt(0, 2);
            const b = new RandomInt(0, 2);

            expect(a.value).toBeGreaterThanOrEqual(0);
            expect(b.value).toBeGreaterThanOrEqual(0);
            expect(a.value).toBeLessThan(2);
            expect(b.value).toBeLessThan(2);
            expect(a.toJSON()).toBe(a.value);
            expect(b.toJSON()).toBe(b.value);
            expect(a.toString()).toBe(a.value.toString(10));
            expect(b.toString()).toBe(b.value.toString(10));
        });
    });
});
