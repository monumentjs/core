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

        it('should create URI with host', function () {
            builder.host = 'localhost';
            expect(builder.build().toString()).toBe('localhost');
        });

        it('should create URI with host, port', function () {
            builder.host = 'localhost';
            builder.port = 1234;
            expect(builder.build().toString()).toBe('localhost:1234');
        });

        it('should create URI with schema, host, port', function () {
            builder.schema = 'https';
            builder.host = 'localhost';
            builder.port = 1234;
            expect(builder.build().toString()).toBe('https://localhost:1234');
        });

        it('should create URI with schema, host, port, path', function () {
            builder.schema = 'https';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            expect(builder.build().toString()).toBe('https://localhost:1234/path/to/endpoint');
        });

        it('should create URI with schema, user name, host, port, path', function () {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            expect(builder.build().toString()).toBe('https://alex@localhost:1234/path/to/endpoint');
        });

        it('should create URI with schema, user name, password, host, port, path', function () {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.password = 'password';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            expect(builder.build().toString()).toBe('https://alex:password@localhost:1234/path/to/endpoint');
        });

        it('should create URI with schema, user name, password, host, port, path, fragment', function () {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.password = 'password';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            builder.fragment = 'section-2';
            expect(builder.build().toString()).toBe('https://alex:password@localhost:1234/path/to/endpoint#section-2');
        });

        it('should create URI with schema, user name, password, host, port, path, query parameter, fragment', function () {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.password = 'password';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            builder.fragment = 'section-2';
            builder.setParameter('id', 123);
            expect(builder.build().toString()).toBe('https://alex:password@localhost:1234/path/to/endpoint?id=123#section-2');
        });

        it('should create URI with schema, user name, password, host, port, path, query parameters, fragment', function () {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.password = 'password';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            builder.fragment = 'section-2';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(builder.build().toString()).toBe('https://alex:password@localhost:1234/path/to/endpoint?id=123&limit=10#section-2');
        });
    });
});
