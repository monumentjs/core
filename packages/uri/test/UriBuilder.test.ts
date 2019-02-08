import { UriBuilder } from '..';

describe('UriBuilder', function() {
    let builder!: UriBuilder;

    beforeEach(() => {
        builder = new UriBuilder();
    });

    describe('build()', function() {
        it('should create URI pointing to the root ("/")', function() {
            expect(builder.build().toString()).toBe('/');
        });

        it('should create URI with host', function() {
            builder.host = 'localhost';
            expect(builder.build().toString()).toBe('localhost');
        });

        it('should create URI with host, port', function() {
            builder.host = 'localhost';
            builder.port = 1234;
            expect(builder.build().toString()).toBe('localhost:1234');
        });

        it('should create URI with schema, host, port', function() {
            builder.schema = 'https';
            builder.host = 'localhost';
            builder.port = 1234;
            expect(builder.build().toString()).toBe('https://localhost:1234');
        });

        it('should create URI with schema, host, port, path', function() {
            builder.schema = 'https';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            expect(builder.build().toString()).toBe('https://localhost:1234/path/to/endpoint');
        });

        it('should create URI with schema, user name, host, port, path', function() {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            expect(builder.build().toString()).toBe('https://alex@localhost:1234/path/to/endpoint');
        });

        it('should create URI with schema, user name, password, host, port, path', function() {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.password = 'password';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            expect(builder.build().toString()).toBe('https://alex:password@localhost:1234/path/to/endpoint');
        });

        it('should create URI with schema, user name, password, host, port, path, fragment', function() {
            builder.schema = 'https';
            builder.userName = 'alex';
            builder.password = 'password';
            builder.host = 'localhost';
            builder.port = 1234;
            builder.path = '/path/to/endpoint';
            builder.fragment = 'section-2';
            expect(builder.build().toString()).toBe('https://alex:password@localhost:1234/path/to/endpoint#section-2');
        });

        it('should create URI with schema, user name, password, host, port, path, query parameter, fragment', function() {
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

        it('should create URI with schema, user name, password, host, port, path, query parameters, fragment', function() {
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

    describe('getParameter(string)', function() {
        it('should return first query parameter value associated with specified name', function() {
            builder.host = 'localhost';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(builder.getParameter('id')).toBe(123);
            expect(builder.getParameter('limit')).toBe('10');
            expect(builder.getParameter('page')).toBe(undefined);
        });
    });

    describe('getParameter(string, ToString)', function() {
        it('should return first query parameter value associated with specified name and fallback', function() {
            builder.host = 'localhost';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(builder.getParameter('id', 1)).toBe(123);
            expect(builder.getParameter('limit', 20)).toBe('10');
            expect(builder.getParameter('page', 10)).toBe(10);
            expect(builder.getParameter('q', '')).toBe('');
        });
    });

    describe('hasParameter(string)', function() {
        it('should determine whether URI contains query parameter associated with specified name', function() {
            builder.host = 'localhost';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(builder.hasParameter('id')).toBe(true);
            expect(builder.hasParameter('limit')).toBe(true);
            expect(builder.hasParameter('page')).toBe(false);
        });
    });

    describe('hasParameter(string, ToString)', function() {
        it('should determine whether URI contains query parameter associated with specified name and value', function() {
            builder.host = 'localhost';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(builder.hasParameter('id', 1)).toBe(false);
            expect(builder.hasParameter('id', 123)).toBe(true);
            expect(builder.hasParameter('id', '123')).toBe(true);
            expect(builder.hasParameter('limit', '10')).toBe(true);
            expect(builder.hasParameter('limit', 10)).toBe(true);
            expect(builder.hasParameter('limit', 20)).toBe(false);
            expect(builder.hasParameter('page', 10)).toBe(false);
        });
    });

    describe('setParameter(string, ToString)', function() {
        it('should set query parameter', function() {
            builder.host = 'localhost';
            expect(builder.setParameter('size', 10)).toBe(true);
            expect(builder.setParameter('size', '10')).toBe(false);
            expect(builder.build().toString()).toBe('localhost?size=10');
        });
    });

    describe('removeParameter(string)', function() {
        it('should remove parameter with specified name', function() {
            builder.host = 'localhost';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(builder.removeParameter('limit')).toBe(true);
            expect(builder.build().toString()).toBe('localhost?id=123');
            expect(builder.removeParameter('id')).toBe(true);
            expect(builder.build().toString()).toBe('localhost');
        });

        it('should remove parameter with specified name and value', function() {
            builder.host = 'localhost';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(builder.removeParameter('limit', 10)).toBe(true);
            expect(builder.removeParameter('limit', 10)).toBe(false);
            expect(builder.build().toString()).toBe('localhost?id=123');
            expect(builder.removeParameter('id', '123')).toBe(true);
            expect(builder.removeParameter('id', '123')).toBe(false);
            expect(builder.build().toString()).toBe('localhost');
        });
    });

    describe('removeParameters(QueryParametersObject)', function() {
        it('should remove parameter with specified name', function() {
            builder.host = 'localhost';
            builder.setParameters({
                id: 123,
                limit: '10'
            });
            expect(
                builder.removeParameters({
                    id: '123',
                    limit: 10
                })
            ).toBe(true);
            expect(builder.build().toString()).toBe('localhost');
        });
    });
});
