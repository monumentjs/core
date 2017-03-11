import EventEmitter from '../../../lib/Core/Events/EventEmitter';
import Timeline from '../../../lib/UI/Animation/Timeline';


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
