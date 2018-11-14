import {UriBuilder} from '..';

describe('UriBuilder', function () {
    let builder!: UriBuilder;

    beforeEach(() => {
        builder = new UriBuilder();
    });

    describe('build()', function () {
        it('should create URI pointing to the root ("/")', function () {
            expect(builder.build().toString()).toBe('/');
        });
    });
});
