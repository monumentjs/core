import EventEmitter from '../../../lib/Core/EventEmitter';
import Timeline from '../../../lib/UI/Animation/Timeline';


describe('UI.Animation.Timeline', () => {
    describe('#constructor()', () => {
        it('should create new instance of Timeline class', () => {
            let timeline: Timeline = null;

            expect(function () {
                timeline = new Timeline();
            }).not.toThrow();

            expect(timeline).toBeInstanceOf(Timeline);
            expect(timeline).toBeInstanceOf(EventEmitter);
        });
    });
});
