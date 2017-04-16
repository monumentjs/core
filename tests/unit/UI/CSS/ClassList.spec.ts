import ClassList from '../../../../src/UI/CSS/ClassList';
import Collection from '../../../../src/Core/Collections/Collection';


describe('ClassList', () => {
    let list: ClassList;


    describe('#constructor()', () => {
        it('create new instance of ClassList class', () => {
            expect(function () {
                list = new ClassList();
            }).not.toThrow();

            expect(list).toBeInstanceOf(ClassList);
            expect(list).toBeInstanceOf(Collection);
        });
    });

});