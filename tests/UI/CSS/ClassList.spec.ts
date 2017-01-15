import ClassList from '../../../lib/UI/CSS/ClassList';
import Collection from '../../../lib/Core/Collection/Collection';


describe('ClassList', () => {
    let list: ClassList;


    describe('#constructor()', () => {
        it('should create new instance of ClassList class', () => {
            expect(function () {
                list = new ClassList();
            }).not.toThrow();

            expect(list).toBeInstanceOf(ClassList);
            expect(list).toBeInstanceOf(Collection);
        });
    });

});