import {UriBuilder, UriIntegrityException} from '..';

describe('UriBuilder', function () {
    let builder!: UriBuilder;

    beforeEach(() => {
        builder = new UriBuilder();
    });

    describe('build()', function () {
        it('should represent root path by default', function () {
            expect(builder.build().toString()).toBe('/');
        });

        it('should throw UriIntegrityException if URI not configured properly', function () {
            builder.schema = 'file';

            expect(builder.build().toString()).toBe('file:///');
        });

        it('should allow UriIntegrityException if URI not configured properly', function () {
            builder.schema = 'http';

            expect(() => {
                builder.build();
            }).toThrow(UriIntegrityException);
        });
    });
});
