/* tslint:disable:max-file-line-count */
import {QueryParameters, Uri, UriComponents, UriFormatException} from '..';

describe('Uri', function () {
    function testComponents(source: string, components: UriComponents) {
        const uri: Uri = new Uri(source);

        expect(uri.schema).toBe(components.schema);
        expect(uri.password).toBe(components.password);
        expect(uri.userName).toBe(components.userName);
        expect(uri.host).toBe(components.host);
        expect(uri.port).toBe(components.port);
        expect(uri.path).toBe(components.path);
        expect(uri.fragment).toBe(components.fragment);
        expect(uri.queryParameters.equals((components.queryParameters || new QueryParameters()))).toBe(true);

        if (components.queryParameters) {
            for (const [key, value] of components.queryParameters) {
                expect(uri.hasParameter(key, value)).toBe(true);
            }
        }
    }

    describe('constructor(uri: string)', function () {
        it('should parse absolute path', function () {
            testComponents('/path/to/resource', {
                path: '/path/to/resource'
            });
        });

        it('should parse absolute path with escaped characters', function () {
            testComponents('/path/to/this%20file.txt', {
                path: '/path/to/this file.txt'
            });
        });

        it('should parse absolute path', function () {
            testComponents('//path/to/resource', {
                host: 'path',
                path: '/to/resource'
            });
        });

        it('should parse relative path', function () {
            testComponents('./path/to/resource', {
                path: './path/to/resource'
            });
        });

        it('should parse relative path', function () {
            testComponents('../path/to/resource', {
                path: '../path/to/resource'
            });
        });

        it('should parse host', function () {
            testComponents('t', {
                host: 't',
                path: '/'
            });
        });

        it('should parse host', function () {
            testComponents('//t', {
                host: 't',
                path: '/'
            });
        });

        it('should parse host', function () {
            testComponents('localhost', {
                host: 'localhost',
                path: '/'
            });
        });

        it('should parse host', function () {
            testComponents('//localhost', {
                host: 'localhost',
                path: '/'
            });
        });

        it('should parse host', function () {
            testComponents('site.com', {
                host: 'site.com',
                path: '/'
            });
        });

        it('should parse host', function () {
            testComponents('//site.com', {
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
        });

        it('should parse host and port', function () {
            testComponents('//t:3000', {
                host: 't',
                port: 3000,
                path: '/'
            });
        });

        it('should parse host and port', function () {
            testComponents('localhost:3000', {
                host: 'localhost',
                port: 3000,
                path: '/'
            });
        });

        it('should parse host and port', function () {
            testComponents('//localhost:3000', {
                host: 'localhost',
                port: 3000,
                path: '/'
            });
        });

        it('should parse host and port', function () {
            testComponents('site.com:3000', {
                host: 'site.com',
                port: 3000,
                path: '/'
            });
        });

        it('should parse host and port', function () {
            testComponents('//site.com:3000', {
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
        });

        it('should parse host and fragment', function () {
            testComponents('//t#id-3', {
                host: 't',
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host and fragment', function () {
            testComponents('localhost#id-3', {
                host: 'localhost',
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host and fragment', function () {
            testComponents('//localhost#id-3', {
                host: 'localhost',
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host and fragment', function () {
            testComponents('site.com#id-3', {
                host: 'site.com',
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host and fragment', function () {
            testComponents('//site.com#id-3', {
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
        });

        it('should parse host, port and fragment', function () {
            testComponents('//t:3000#id-3', {
                host: 't',
                port: 3000,
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host, port and fragment', function () {
            testComponents('localhost:3000#id-3', {
                host: 'localhost',
                port: 3000,
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host, port and fragment', function () {
            testComponents('//localhost:3000#id-3', {
                host: 'localhost',
                port: 3000,
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host, port and fragment', function () {
            testComponents('site.com:3000#id-3', {
                host: 'site.com',
                port: 3000,
                fragment: 'id-3',
                path: '/'
            });
        });

        it('should parse host, port and fragment', function () {
            testComponents('//site.com:3000#id-3', {
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
        });

        it('should parse schema, host and port', function () {
            testComponents('https://localhost:3000', {
                schema: 'https',
                host: 'localhost',
                port: 3000,
                path: '/'
            });
        });

        it('should parse schema, host and port', function () {
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
        });

        it('should parse host and path', function () {
            testComponents('//t/path/to/resource', {
                host: 't',
                path: '/path/to/resource'
            });
        });

        it('should parse encoded host and encoded path', function () {
            // tslint:disable-next-line:max-line-length
            testComponents('%D1%81%D0%B0%D0%B9%D1%82.%D1%80%D1%84/%D0%BF%D1%83%D1%82%D1%8C/%D0%BA/%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D1%83', {
                host: 'сайт.рф',
                path: '/путь/к/ресурсу'
            });
        });

        it('should parse host and path', function () {
            testComponents('localhost/path/to/resource', {
                host: 'localhost',
                path: '/path/to/resource'
            });
        });

        it('should parse host and encoded path', function () {
            testComponents('localhost/path/to/%D0%BC%D0%BE%D1%8F%20%D0%BF%D0%B0%D0%BF%D0%BA%D0%B0', {
                host: 'localhost',
                path: '/path/to/моя папка'
            });
        });

        it('should parse host and path', function () {
            testComponents('//localhost/path/to/resource', {
                host: 'localhost',
                path: '/path/to/resource'
            });
        });

        it('should parse host and path', function () {
            testComponents('site.com/path/to/resource', {
                host: 'site.com',
                path: '/path/to/resource'
            });
        });

        it('should parse host and path', function () {
            testComponents('//site.com/path/to/resource', {
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
        });

        it('should parse schema, host and path', function () {
            testComponents('https://localhost/path/to/resource', {
                schema: 'https',
                host: 'localhost',
                path: '/path/to/resource'
            });
        });

        it('should parse schema, encoded host and encoded path', function () {
            // tslint:disable-next-line:max-line-length
            testComponents('https://%D1%81%D0%B0%D0%B9%D1%82.%D1%80%D1%84/%D0%BF%D1%83%D1%82%D1%8C/%D0%BA/%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D1%83', {
                schema: 'https',
                host: 'сайт.рф',
                path: '/путь/к/ресурсу'
            });
        });

        it('should parse schema, host and path', function () {
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
        });

        it('should parse host, port and path', function () {
            testComponents('//t:3000/path/to/resource', {
                host: 't',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse host, port and path', function () {
            testComponents('localhost:3000/path/to/resource', {
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse host, port and path', function () {
            testComponents('//localhost:3000/path/to/resource', {
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse host, port and path', function () {
            testComponents('site.com:3000/path/to/resource', {
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse host, port and path', function () {
            testComponents('//site.com:3000/path/to/resource', {
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
        });

        it('should parse schema, host, port and path', function () {
            testComponents('http://localhost:3000/path/to/resource', {
                schema: 'http',
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse schema, host, port and path', function () {
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
        });

        it('should parse schema, user name, host, port and path', function () {
            testComponents('http://alex@localhost:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse schema, user name, host, port and path', function () {
            expect(() => {
                testComponents('http://@localhost:3000/path/to/resource', {
                    schema: 'http',
                    userName: 'alex',
                    host: 'localhost',
                    port: 3000,
                    path: '/path/to/resource'
                });
            }).toThrow(UriFormatException);
        });

        it('should parse schema, user name, host, port and path', function () {
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
        });

        it('should parse schema, user name, password host, port and path', function () {
            testComponents('http://alex:pass123@localhost:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                password: 'pass123',
                host: 'localhost',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse schema, user name, password host, port and path', function () {
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
        });

        it('should parse schema, user name, password host, port and path', function () {
            testComponents('http://alex:pass123@site.com:3000/path/to/resource', {
                schema: 'http',
                userName: 'alex',
                password: 'pass123',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            });
        });

        it('should parse URI with double slash in the beginning', function () {
            testComponents('//alex:pass123@site.com:3000/path/to/resource', {
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
        });

        it('should parse schema, user name, password host and port', function () {
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
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse host and query parameters', function () {
            testComponents('//localhost?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'localhost',
                path: '/',
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse host and query parameters', function () {
            testComponents('site.com?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'site.com',
                path: '/',
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse host and query parameters', function () {
            testComponents('//site.com?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'site.com',
                path: '/',
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

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
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse host, port and query parameters', function () {
            testComponents('//localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'localhost',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse host, port and query parameters', function () {
            testComponents('site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse host, port and query parameters', function () {
            testComponents('//site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

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
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, host, port and query parameters', function () {
            testComponents('//alex@localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                host: 'localhost',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, host, port and query parameters', function () {
            testComponents('alex@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, host, port and query parameters', function () {
            testComponents('//alex@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

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
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, password, host, port and query parameters', function () {
            testComponents('//alex:PaSsWoRd@localhost:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'localhost',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, password, host, port and query parameters', function () {
            testComponents('alex:PaSsWoRd@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse user name, password, host, port and query parameters', function () {
            testComponents('//alex:PaSsWoRd@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

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
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse schema, user name, password, host, port and query parameters', function () {
            testComponents('https://alex:PaSsWoRd@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=', {
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/',
                port: 3000,
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

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
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            });
        });

        it('should parse schema, user name, password, host, port, query parameters and hash', function () {
            testComponents('https://alex:PaSsWoRd@site.com:3000?name=Alex&age=25&position=Senior%20Developer&q=#id-3', {
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
            });
        });

        it('should parse file URI', function () {
            testComponents('file:///', {
                schema: 'file',
                host: 'localhost',
                path: '/'
            });
        });

        it('should parse file URI', function () {
            testComponents('file:///path/to/file.txt', {
                schema: 'file',
                host: 'localhost',
                path: '/path/to/file.txt'
            });
        });

        it('should parse file URI', function () {
            testComponents('file:///c:/path/to/file.txt', {
                schema: 'file',
                host: 'localhost',
                path: '/c:/path/to/file.txt'
            });
        });
    });

    describe('equals(uri: string)', function () {
        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                host: 'site.com'
            }).equals('site.com')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                host: 'site.com'
            }).equals('alex@site.com')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                password: 'secret',
                host: 'site.com'
            }).equals('alex:secret@site.com')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                host: 'site.com'
            }).equals('https://site.com')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                userName: 'alex',
                host: 'site.com'
            }).equals('https://alex@site.com')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                userName: 'alex',
                password: 'secret',
                host: 'site.com'
            }).equals('https://alex:secret@site.com')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                host: 'site.com',
                port: 3000
            }).equals('site.com:3000')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                host: 'site.com',
                port: 3000
            }).equals('alex@site.com:3000')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                password: 'secret',
                host: 'site.com',
                port: 3000
            }).equals('alex:secret@site.com:3000')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                host: 'site.com',
                path: '/path/to/resource'
            }).equals('site.com/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                host: 'site.com',
                path: '/path/to/resource'
            }).equals('alex@site.com/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                password: 'secret',
                host: 'site.com',
                path: '/path/to/resource'
            }).equals('alex:secret@site.com/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            }).equals('site.com:3000/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            }).equals('alex@site.com:3000/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                userName: 'alex',
                password: 'secret',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            }).equals('alex:secret@site.com:3000/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                host: 'site.com',
                path: '/path/to/resource'
            }).equals('https://site.com/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource'
            }).equals('https://site.com:3000/path/to/resource')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                host: 'site.com',
                path: '/path/to/resource',
                fragment: 'footer'
            }).equals('https://site.com/path/to/resource#footer')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource',
                fragment: 'footer'
            }).equals('https://site.com:3000/path/to/resource#footer')).toBe(true);
        });

        it('should compare current URI with other specified as string', function () {
            expect(new Uri({
                schema: 'https',
                host: 'site.com',
                port: 3000,
                path: '/path/to/resource',
                fragment: 'footer',
                queryParameters: (() => {
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('q', 'javascript');
                    parameters.put('p', 2);

                    return parameters;
                })()
            }).equals('https://site.com:3000/path/to/resource?q=javascript&p=2#footer')).toBe(true);
        });
    });

    describe('equals(components: UriComponents)', function () {
        it('should compare current URI with other specified as UriComponents', function () {
            const uri: Uri = new Uri({
                host: 'site.com',
                port: 3000
            });

            expect(uri.equals(uri)).toBe(true);
        });
    });

    describe('getParameter(name: string)', function () {
        it('should return first query parameter value associated with given name', function () {
            const uri: Uri = new Uri('site.com?t=1&t=2&p=2');

            expect(uri.getParameter('t')).toBe('1');
            expect(uri.getParameter('p')).toBe('2');
            expect(uri.getParameter('s')).toBe(undefined);
        });
    });

    describe('getParameter(name: string, fallback: ToString)', function () {
        it('should determine whether URI has query parameter with given name and value', function () {
            const uri: Uri = new Uri('site.com?t=123');

            expect(uri.getParameter('t', () => '456')).toBe('123');
            expect(uri.getParameter('q', () => 'javascript')).toBe('javascript');
            expect(uri.getParameter('p', () => 2)).toBe(2);
        });
    });

    describe('hasParameter(name: string)', function () {
        it('should determine whether URI has query parameter with given name', function () {
            const uri: Uri = new Uri('site.com?q=javascript&p=2');

            expect(uri.hasParameter('q')).toBe(true);
            expect(uri.hasParameter('p')).toBe(true);
            expect(uri.hasParameter('d')).toBe(false);
            expect(uri.hasParameter('b')).toBe(false);
        });
    });

    describe('hasParameter(name: string, value: ToValue)', function () {
        it('should determine whether URI has query parameter with given name and value', function () {
            const uri: Uri = new Uri('site.com?q=javascript&p=2');

            expect(uri.hasParameter('q', 'javascript')).toBe(true);
            expect(uri.hasParameter('p', 2)).toBe(true);
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
                    const parameters: QueryParameters = new QueryParameters();

                    parameters.put('age', '25');
                    parameters.put('name', 'Alex');
                    parameters.put('position', 'Senior Developer');
                    parameters.put('q', '');

                    return parameters;
                })()
            }).toString()).toBe('https://alex:PaSsWoRd@site.com:3000?age=25&name=Alex&position=Senior%20Developer&q=#id-3');
        });

        it('should serialize schema, user name, password, host, port, path, query parameters and fragment', function () {
            expect(new Uri({
                schema: 'https',
                userName: 'alex',
                password: 'PaSsWoRd',
                host: 'site.com',
                path: '/search',
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
                    const parameters: QueryParameters = new QueryParameters();

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
        });

        it('should serialize host, port and path', function () {
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
        });

        it('should serialize host, port, path and fragment', function () {
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
        });

        it('should serialize host and path', function () {
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
                    const parameters: QueryParameters = new QueryParameters();

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
        });

        it('should serialize file URI with default path', function () {
            expect(new Uri({
                schema: 'file',
                path: '/'
            }).toString()).toBe('file:///');
        });

        it('should serialize file URI with UNIX absolute path', function () {
            expect(new Uri({
                schema: 'file',
                path: '/path/to/file.txt'
            }).toString()).toBe('file:///path/to/file.txt');
        });

        it('should serialize file URI with absolute path in Windows format with UNIX-way path fragments delimiters', function () {
            expect(new Uri({
                schema: 'file',
                path: 'c:/path/to/file.txt'
            }).toString()).toBe('file:///c:/path/to/file.txt');
        });

        it('should serialize file URI with absolute path in Windows format', function () {
            expect(new Uri({
                schema: 'file',
                path: 'c:\\path\\to\\file.txt'
            }).toString()).toBe('file:///c:/path/to/file.txt');
        });

        it('should serialize file URI with absolute path in Windows format with custom port', function () {
            expect(new Uri({
                schema: 'file',
                port: 3000,
                path: 'c:\\path\\to\\file.txt'
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

    describe('withSchema(schema: string)', function () {
        it('should return new URI with overridden schema component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withSchema('https');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('https://site.com');
        });
    });

    describe('withoutSchema()', function () {
        it('should return new URI without schema component', function () {
            const originalUri: Uri = new Uri('https://site.com');
            const newUri: Uri = originalUri.withoutSchema();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('https://site.com');
            expect(newUri.toString()).toBe('site.com');
        });
    });

    describe('withUserName(userName: string)', function () {
        it('should return new URI with overridden user name component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withUserName('alex');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('alex@site.com');
        });
    });

    describe('withoutUserName()', function () {
        it('should return new URI without user name component', function () {
            const originalUri: Uri = new Uri('alex@site.com');
            const newUri: Uri = originalUri.withoutUserName();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('alex@site.com');
            expect(newUri.toString()).toBe('site.com');
        });
    });

    describe('withPassword(password: string)', function () {
        it('should return new URI with overridden password component', function () {
            const originalUri: Uri = new Uri('alex@site.com');
            const newUri: Uri = originalUri.withPassword('secret');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('alex@site.com');
            expect(newUri.toString()).toBe('alex:secret@site.com');
        });
    });

    describe('withoutPassword()', function () {
        it('should return new URI without password component', function () {
            const originalUri: Uri = new Uri('alex:secret@site.com');
            const newUri: Uri = originalUri.withoutPassword();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('alex:secret@site.com');
            expect(newUri.toString()).toBe('alex@site.com');
        });
    });

    describe('withHost(host: string)', function () {
        it('should return new URI with overridden host component', function () {
            const originalUri: Uri = new Uri('/path');
            const newUri: Uri = originalUri.withHost('site.com');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('/path');
            expect(newUri.toString()).toBe('site.com/path');
        });
    });

    describe('withoutHost()', function () {
        it('should return new URI without host component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withoutHost();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('/');
        });
    });

    describe('withPort(port: number)', function () {
        it('should return new URI with overridden port component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withPort(3000);

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('site.com:3000');
        });
    });

    describe('withoutPort()', function () {
        it('should return new URI without port component', function () {
            const originalUri: Uri = new Uri('site.com:3000');
            const newUri: Uri = originalUri.withoutPort();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com:3000');
            expect(newUri.toString()).toBe('site.com');
        });
    });

    describe('withPath(path: string)', function () {
        it('should return new URI with overridden path component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withPath('/path/to/resource');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('site.com/path/to/resource');
        });
    });

    describe('withoutPath()', function () {
        it('should return new URI without path component', function () {
            const originalUri: Uri = new Uri('site.com/path/to/resource');
            const newUri: Uri = originalUri.withoutPath();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com/path/to/resource');
            expect(newUri.toString()).toBe('site.com');
        });
    });

    describe('withFragment(fragment: string)', function () {
        it('should return new URI with overridden fragment component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withFragment('section-b');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('site.com#section-b');
        });
    });

    describe('withoutFragment()', function () {
        it('should return new URI without fragment component', function () {
            const originalUri: Uri = new Uri('site.com#section-b');
            const newUri: Uri = originalUri.withoutFragment();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com#section-b');
            expect(newUri.toString()).toBe('site.com');
        });
    });

    describe('withParameter(name: string, value: ToString)', function () {
        it('should return new URI with overridden query parameter component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri.withParameter('q', 'javascript');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('site.com?q=javascript');
        });

        it('should return new URI with overridden query parameter component', function () {
            const originalUri: Uri = new Uri('site.com');
            const newUri: Uri = originalUri
                .withParameter('q', 'javascript')
                .withParameter('p', 2);

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com');
            expect(newUri.toString()).toBe('site.com?q=javascript&p=2');
        });
    });

    describe('withoutParameter(name: string)', function () {
        it('should return new URI without query parameter component', function () {
            const originalUri: Uri = new Uri('site.com?q=javascript&p=2');
            const newUri: Uri = originalUri.withoutParameter('p');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com?q=javascript&p=2');
            expect(newUri.toString()).toBe('site.com?q=javascript');
        });

        it('should return new URI without query parameter component', function () {
            const originalUri: Uri = new Uri('site.com?q=javascript&p=2');
            const newUri: Uri = originalUri.withoutParameter('p', 2);

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com?q=javascript&p=2');
            expect(newUri.toString()).toBe('site.com?q=javascript');
        });

        it('should return new URI without query parameter component', function () {
            const originalUri: Uri = new Uri('site.com?q=javascript&p=2');
            const newUri: Uri = originalUri
                .withoutParameter('p', 2)
                .withoutParameter('q', 'javascript');

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com?q=javascript&p=2');
            expect(newUri.toString()).toBe('site.com');
        });
    });

    describe('withoutParameters()', function () {
        it('should return new URI without query parameters', function () {
            const originalUri: Uri = new Uri('site.com?q=javascript&p=2');
            const newUri: Uri = originalUri.withoutParameters();

            expect(originalUri).not.toBe(newUri);
            expect(originalUri.toString()).toBe('site.com?q=javascript&p=2');
            expect(newUri.toString()).toBe('site.com');
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

    test('immutability of with* and without* methods', function () {
        const uri: Uri = new Uri();
        const withHost: Uri = uri.withHost('site.com');
        const withSchema: Uri = withHost.withSchema('https');
        const withPort: Uri = withSchema.withPort(3000);
        const withPath: Uri = withPort.withPath('/path/to/resource');
        const withUserName: Uri = withPath.withUserName('alex');
        const withPassword: Uri = withUserName.withPassword('secret');
        const withFragment: Uri = withPassword.withFragment('section-b');
        const withParameter: Uri = withFragment.withParameter('q', 'typescript');
        const withParameters: Uri = withParameter.withParameters({
            p: 1
        });

        expect(uri.toString()).toBe('/');
        expect(withHost.toString()).toBe('site.com');
        expect(withSchema.toString()).toBe('https://site.com');
        expect(withPort.toString()).toBe('https://site.com:3000');
        expect(withPath.toString()).toBe('https://site.com:3000/path/to/resource');
        expect(withUserName.toString()).toBe('https://alex@site.com:3000/path/to/resource');
        expect(withPassword.toString()).toBe('https://alex:secret@site.com:3000/path/to/resource');
        expect(withFragment.toString()).toBe('https://alex:secret@site.com:3000/path/to/resource#section-b');
        expect(withParameter.toString()).toBe('https://alex:secret@site.com:3000/path/to/resource?q=typescript#section-b');
        expect(withParameters.toString()).toBe('https://alex:secret@site.com:3000/path/to/resource?q=typescript&p=1#section-b');
    });
});
