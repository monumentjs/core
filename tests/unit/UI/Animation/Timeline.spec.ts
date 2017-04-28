import {Timeline} from '../../../../src/UI/Animation/Timeline';
import {EventEmitter} from '../../../../src/Core/Events/EventEmitter';


describe('Timeline', () => {
    describe('#constructor()', () => {
        it('create new instance of Timeline class', () => {
            let timeline: Timeline = null;

            expect(function () {
                timeline = new Timeline();
            }).not.toThrow();

            expect(timeline).toBeInstanceOf(Timeline);
            expect(timeline).toBeInstanceOf(EventEmitter);
        });
    });
});
