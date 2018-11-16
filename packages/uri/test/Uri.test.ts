import {Uri, UriComponents, UriFormatException} from '..';
import {QueryParameters} from '../src/QueryParameters';

describe('Uri', function () {
    function testComponents(source: string, components: UriComponents) {
        const uri = new Uri(source);

        expect(uri.schema).toBe(components.schema);
        expect(uri.password).toBe(components.password);
        expect(uri.userName).toBe(components.userName);
        expect(uri.host).toBe(components.host);
        expect(uri.port).toBe(components.port);
        expect(uri.path).toBe(components.path);
        expect(uri.queryParameters.equals((components.queryParameters || new QueryParameters()))).toBe(true);
        expect(uri.fragment).toBe(components.fragment);
    }

    describe('constructor(string)', function () {
        it('should parse absolute path', function () {
            testComponents('/path/to/resource', {
                path: '/path/to/resource'
            });
        });

        it('should parse relative path', function () {
            testComponents('./path/to/resource', {
                path: './path/to/resource'
            });

            testComponents('../path/to/resource', {
                path: '../path/to/resource'
            });
        });

        it('should parse host', function () {
            testComponents('t', {
                host: 't',
                path: '/'
            });

            testComponents('localhost', {
                host: 'localhost',
                path: '/'
            });

            testComponents('site.com', {
                host: 'site.com',
                path: '/'
            });
        });

        it('should parse host and port', function () {
            testComponents('t:3000', {
                host: 't',
                port: 3000,
                path: '/'
            });

            testComponents('localhost:3000', {
                host: 'localhost',
                port: 3000,
                path: '/'
            });

            testComponents('site.com:3000', {
                host: 'site.com',
                port: 3000,
                path: '/'
            });
        });

        it('should parse host and fragment', function () {
            testComponents('t#id-3', {
                host: 't',
                fragment: 'id-3',
                path: '/'
            });

            testComponents('localhost#id-3', {
                host: 'localhost',
                fragment: 'id-3',
                path: '/'
            });

            testComponents('site.com#id-3', {
                host: 'site.com',
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host, port and fragment', function () {
            testComponents('t:3000#id-3', {
                host: 't',
                port: 3000,
                fragment: 'id-3',
                path: '/'
            });

            testComponents('localhost:3000#id-3', {
                host: 'localhost',
                port: 3000,
                fragment: 'id-3',
                path: '/'
            });

            testComponents('site.com:3000#id-3', {
                host: 'site.com',
                port: 3000,
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse schema, host and port', function () {
            testComponents('https://t:3000', {
                schema: 'https',
                host: 't',
                port: 3000,
                path: '/'
            });

            testComponents('https://localhost:3000', {
                schema: 'https',
                host: 'localhost',
                port: 3000,
                path: '/'
            });

            testComponents('https://site.com:3000', {
                schema: 'https',
                host: 'site.com',
                port: 3000,
                path: '/'
            });
        });

        it('should parse host and path', function () {
            testComponents('t/path/to/resource', {
                host: 't',
                path: '/path/to/resource'
            });

            testComponents('localhost/path/to/resource', {
                host: 'localhost',
                path: '/path/to/resource'
            });

            testComponents('site.com/path/to/resource', {
                host: 'site.com',
                path: '/path/to/resource'
            });
        });

        it('should parse schema, host and path', function () {
            testComponents('https://t/path/to/resource', {
                schema: 'https',
                host: 't',
                path: '/path/to/resource'
            });

            testComponents('https://localhost/path/to/resource', {
                schema: 'https',
                host: 'localhost',
                path: '/path/to/resource'
            });

            testComponents('https://site.com/path/to/resource', {
                schema: 'https',
                host: 'site.com',
                path: '/path/to/resource'
            });
        });

        it('should parse host, port and path', function () {
            testComponents('t:3000/path/to/resource', {
                host: 't',
                port: 3000,
                path: '/path/to/resource'
            });

            testComponents('localhost:3000/path/to/resource', {
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });

            testComponents('site.com:3000/path/to/resource', {
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse schema, host, port and path', function () {
            testComponents('http://t:3000/path/to/resource', {
                schema: 'http',
                host: 't',
                port: 3000,
                path: '/path/to/resource'
            });

            testComponents('http://localhost:3000/path/to/resource', {
                schema: 'http',
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });

            testComponents('http://site.com:3000/path/to/resource', {
                schema: 'http',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse schema, user name, host, port and path', function () {
            testComponents('http://alex@t:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                host: 't',
                port: 3000,
                path: '/path/to/resource'
            });

            testComponents('http://alex@localhost:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });

            expect(() => {
                testComponents('http://@localhost:3000/path/to/resource', {
                    schema: 'http',
                    userName: 'alex',
                    host: 'localhost',
                    port: 3000,
                    path: '/path/to/resource'
                });
            }).toThrow(UriFormatException);

            testComponents('http://alex@site.com:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse schema, user name, password host, port and path', function () {
            testComponents('http://alex:pass123@t:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                password: 'pass123',
                host: 't',
                port: 3000,
                path: '/path/to/resource'
            });

            testComponents('http://alex:pass123@localhost:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                password: 'pass123',
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });

            expect(() => {
                testComponents('http://alex:@localhost:3000/path/to/resource', {
                    schema: 'http',
                    userName: 'alex',
                    password: '',
                    host: 'localhost',
                    port: 3000,
                    path: '/path/to/resource'
                });
            }).toThrow(UriFormatException);

            testComponents('http://alex:pass123@site.com:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                password: 'pass123',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse schema, user name, password host and port', function () {
            testComponents('http://alex:pass123@localhost:3000', {
                schema: 'http',
                userName: 'alex',
                password: 'pass123',
                host: 'localhost',
                port: 3000,
                path: '/'
            });

            testComponents('http://alex:pass123@site.com:3000', {
                schema: 'http',
                userName: 'alex',
                password: 'pass123',
                host: 'site.com',
                port: 3000,
                path: '/'
            });
        });

        it('should parse host and query parameters', function () {
            testComponents('localhost?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'localhost',
                path: '/',
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });

            testComponents('site.com?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'site.com',
                path: '/',
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse host, port and query parameters', function () {
            testComponents('localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'localhost',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });

            testComponents('site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, host, port and query parameters', function () {
            testComponents('alex@localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                host: 'localhost',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });

            testComponents('alex@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, password, host, port and query parameters', function () {
            testComponents('alex:PaSsWoRd@localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'localhost',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });

            testComponents('alex:PaSsWoRd@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse schema, user name, password, host, port and query parameters', function () {
            testComponents('https://alex:PaSsWoRd@localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'localhost',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });

            testComponents('https://alex:PaSsWoRd@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse schema, user name, password, host, port, query parameters and hash', function () {
            testComponents('https://alex:PaSsWoRd@localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=#id-3', {
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'localhost',
                path: '/',
                port: 3000,
                fragment: 'id-3',
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });

            testComponents('https://alex:PaSsWoRd@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=#id-3', {
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                fragment: 'id-3',
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse file URI', function () {
            testComponents('file:///', {
                schema: 'file',
                host: 'localhost',
                path: '/'
            });

            testComponents('file:///path/to/file.txt', {
                schema: 'file',
                host: 'localhost',
                path: '/path/to/file.txt'
            });

            testComponents('file:///c:/path/to/file.txt', {
                schema: 'file',
                host: 'localhost',
                path: '/c:/path/to/file.txt'
            });
        });
    });

    describe('toString()', function () {
        it('should serialize schema, user name, password, host, port, path, query parameters and fragment', function () {
            expect(new Uri({
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                fragment: 'id-3',
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            }).toString()).toBe('https://alex:PaSsWoRd@site.com:3000?age=25&name=Alex&position=Senior%20Developer&q=#id-3');

            expect(new Uri({
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/search',
                port: 3000,
                fragment: 'id-3',
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            }).toString()).toBe('https://alex:PaSsWoRd@site.com:3000/search?age=25&name=Alex&position=Senior%20Developer&q=#id-3');
        });

        it('should serialize host', function () {
            expect(new Uri({
                host: 'site.com'
            }).toString()).toBe('site.com');
        });

        it('should serialize host and port', function () {
            expect(new Uri({
                host: 'site.com',
                port: 3000
            }).toString()).toBe('site.com:3000');
        });

        it('should serialize host, port and query parameters', function () {
            expect(new Uri({
                host: 'site.com',
                port: 3000,
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            }).toString()).toBe('site.com:3000?age=25&name=Alex&position=Senior%20Developer&q=');
        });

        it('should serialize host, port and fragment', function () {
            expect(new Uri({
                host: 'site.com',
                port: 3000,
                fragment: 'id-3'
            }).toString()).toBe('site.com:3000#id-3');
        });

        it('should serialize host, port and path', function () {
            expect(new Uri({
                host: 'site.com',
                port: 3000,
                path: '/'
            }).toString()).toBe('site.com:3000');

            expect(new Uri({
                host: 'site.com',
                port: 3000,
                path: '/search'
            }).toString()).toBe('site.com:3000/search');
        });

        it('should serialize host, port, path and fragment', function () {
            expect(new Uri({
                host: 'site.com',
                port: 3000,
                path: '/',
                fragment: 'id-3'
            }).toString()).toBe('site.com:3000#id-3');

            expect(new Uri({
                host: 'site.com',
                port: 3000,
                path: '/search',
                fragment: 'id-3'
            }).toString()).toBe('site.com:3000/search#id-3');
        });

        it('should serialize host and path', function () {
            expect(new Uri({
                host: 'site.com',
                path: '/'
            }).toString()).toBe('site.com');

            expect(new Uri({
                host: 'site.com',
                path: '/search'
            }).toString()).toBe('site.com/search');
        });

        it('should serialize host', function () {
            expect(new Uri({
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                fragment: 'id-3',
                queryParameters: (() => {
                    const parameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            }).toString()).toBe('https://alex:PaSsWoRd@site.com:3000?age=25&name=Alex&position=Senior%20Developer&q=#id-3');
        });

        it('should serialize file URI with default path', function () {
            expect(new Uri({
                schema: 'file'
            }).toString()).toBe('file:///');

            expect(new Uri({
                schema: 'file',
                path: '/',
            }).toString()).toBe('file:///');
        });

        it('should serialize file URI with UNIX absolute path', function () {
            expect(new Uri({
                schema: 'file',
                path: '/path/to/file.txt',
            }).toString()).toBe('file:///path/to/file.txt');
        });

        it('should serialize file URI with absolute path in Windows format with UNIX-way path fragments delimiters', function () {
            expect(new Uri({
                schema: 'file',
                path: 'c:/path/to/file.txt',
            }).toString()).toBe('file:///c:/path/to/file.txt');
        });

        it('should serialize file URI with absolute path in Windows format', function () {
            expect(new Uri({
                schema: 'file',
                path: 'c:\\path\\to\\file.txt',
            }).toString()).toBe('file:///c:/path/to/file.txt');
        });

        it('should serialize file URI with absolute path in Windows format with custom port', function () {
            expect(new Uri({
                schema: 'file',
                port: 3000,
                path: 'c:\\path\\to\\file.txt',
            }).toString()).toBe('file://localhost:3000/c:/path/to/file.txt');
        });
    });

    describe('toJSON()', function () {
        it('should serialize to string', function () {
            expect(JSON.stringify(new Uri({
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                fragment: 'id-3',
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            }))).toBe('"https://alex:PaSsWoRd@site.com:3000?age=25&name=Alex&position=Senior%20Developer&q=#id-3"');
        });
    });

    describe('withSchema(string)', function () {
        it('should return new URI with overridden schema component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withSchema('https');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.schema).not.toBe(newUri.schema);
            expect(originalUri.schema).toBe(undefined);
            expect(newUri.schema).toBe('https');
        });
    });

    describe('withoutSchema()', function () {
        it('should return new URI without schema component', function () {
            const originalUri: Uri = new Uri('https://site.com');
            const newUri: Uri = originalUri.withoutSchema();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.schema).not.toBe(newUri.schema);
            expect(originalUri.schema).toBe('https');
            expect(newUri.schema).toBe(undefined);
        });
    });

    describe('withHost(string)', function () {
        it('should return new URI with overridden host component', function () {
            const originalUri: Uri = new Uri('/');
            const newUri: Uri = originalUri.withHost('site.com');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.host).not.toBe(newUri.host);
            expect(originalUri.host).toBe(undefined);
            expect(newUri.host).toBe('site.com');
        });
    });

    describe('withoutHost()', function () {
        it('should return new URI without host component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withoutHost();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.host).not.toBe(newUri.host);
            expect(originalUri.host).toBe('site.com');
            expect(newUri.host).toBe(undefined);
        });
    });

    describe('withPort(number)', function () {
        it('should return new URI with overridden port component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withPort(3000);

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.port).not.toBe(newUri.port);
            expect(originalUri.port).toBe(undefined);
            expect(newUri.port).toBe(3000);
        });
    });

    describe('withoutPort()', function () {
        it('should return new URI without port component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withoutHost();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.host).not.toBe(newUri.host);
            expect(originalUri.host).toBe('site.com');
            expect(newUri.host).toBe(undefined);
        });
    });

    describe('static isValid()', function () {
        it('should check URI has valid format', function () {
            expect(Uri.isValid('/')).toBe(true);
            expect(Uri.isValid('/search')).toBe(true);
            expect(Uri.isValid('/search?a=1&b=2&c=3')).toBe(true);
            expect(Uri.isValid('/search#menu')).toBe(true);
            expect(Uri.isValid('/search/user')).toBe(true);
            expect(Uri.isValid('/search/user?a=1&b=2&c=3')).toBe(true);
            expect(Uri.isValid('/search/user#menu')).toBe(true);
            expect(Uri.isValid('site.com')).toBe(true);
            expect(Uri.isValid('site.com/search')).toBe(true);
            expect(Uri.isValid('site.com?a=1&b=2&c=3')).toBe(true);
            expect(Uri.isValid('site.com#menu')).toBe(true);
            expect(Uri.isValid('site.com:3000')).toBe(true);
            expect(Uri.isValid('site.com:3000/search')).toBe(true);
            expect(Uri.isValid('site.com:3000?a=1&b=2&c=3')).toBe(true);
            expect(Uri.isValid('site.com:3000#menu')).toBe(true);
            expect(Uri.isValid('site.com:3000/search')).toBe(true);
            expect(Uri.isValid('https://site.com')).toBe(true);
            expect(Uri.isValid('https://site.com:3000')).toBe(true);
            expect(Uri.isValid('https://site.com:3000/search')).toBe(true);
            expect(Uri.isValid('https://site.com:3000?a=1&b=2&c=3')).toBe(true);
            expect(Uri.isValid('https://site.com:3000#menu')).toBe(true);
            expect(Uri.isValid('https://site.com:3000/search')).toBe(true);
            expect(Uri.isValid('https://alex@site.com')).toBe(true);
            expect(Uri.isValid('https://alex@site.com:3000')).toBe(true);
            expect(Uri.isValid('https://alex@site.com:3000/search')).toBe(true);
            expect(Uri.isValid('https://alex@site.com:3000?a=1&b=2&c=3')).toBe(true);
            expect(Uri.isValid('https://alex@site.com:3000#menu')).toBe(true);
            expect(Uri.isValid('https://alex@site.com:3000/search')).toBe(true);
            expect(Uri.isValid('https://alex:password@site.com')).toBe(true);
            expect(Uri.isValid('https://alex:password@site.com:3000')).toBe(true);
            expect(Uri.isValid('https://alex:password@site.com:3000/search')).toBe(true);
            expect(Uri.isValid('https://alex:password@site.com:3000?a=1&b=2&c=3')).toBe(true);
            expect(Uri.isValid('https://alex:password@site.com:3000#menu')).toBe(true);
            expect(Uri.isValid('https://alex:password@site.com:3000/search')).toBe(true);
        });
    });
});
