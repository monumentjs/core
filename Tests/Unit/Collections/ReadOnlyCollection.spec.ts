import {ReadOnlyCollection} from '../../../Source/Collections/ReadOnlyCollection';
import {ArgumentNullException} from '../../../Source/Exceptions/ArgumentNullException';
import {IgnoreCaseComparator} from '../../../Source/Text/IgnoreCaseComparator';


describe(`ReadOnlyCollection`, () => {
    let instance: ReadOnlyCollection<string> = null;


    beforeEach(() => {
        expect(() => {
            instance = new ReadOnlyCollection<string>(['one', 'ONE', 'two', 'Two', 'Three']);
        }).not.toThrow();
    });


    describe(`#constructor()`, () => {
        it(`creates new instance of ReadOnlyCollection`, () => {
            expect(instance).toBeInstanceOf(ReadOnlyCollection);
        });

        it(`throws if source list is not defined`, () => {
            expect(() => {
                return new ReadOnlyCollection(null);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                return new ReadOnlyCollection(undefined);
            }).not.toThrowError(ArgumentNullException);
        });
    });


    describe('#contains()', () => {
        it(`throws if 'comparator' argument is null`, () => {
            expect(() => {
                instance.contains('one', null);
            }).toThrowError(ArgumentNullException);

            expect(() => {
                instance.contains('one', undefined);
            }).not.toThrowError(ArgumentNullException);
        });

        it('determines whether collection already contains specified item using default equality comparator', () => {
            expect(instance.contains('one')).toEqual(true);
            expect(instance.contains('two')).toEqual(true);
            expect(instance.contains('three')).toEqual(false);
        });

        it('determines whether collection already contains specified item using custom equality comparator', () => {
            expect(instance.contains('One', IgnoreCaseComparator.instance)).toEqual(true);
            expect(instance.contains('TWO', IgnoreCaseComparator.instance)).toEqual(true);
            expect(instance.contains('three', IgnoreCaseComparator.instance)).toEqual(true);
        });
    });
});