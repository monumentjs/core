import {IUriAttributes} from '../../../../src/System/Uri/types';
import {Uri} from '../../../../src/System/Uri/Uri';
import {ArgumentNullException} from '../../../../src/Core/Exceptions/ArgumentNullException';
import {UriFormatException} from '../../../../src/System/Uri/UriFormatException';
import uriAttributesFixtures from './fixtures/UriAttributesFixture';

const URL_VARIANTS = [
    [
        'https://www.example.com:8080/post?id=123&date=2017-03-25#comment-456',
        'https://www.example.com:8080/post?date=2017-03-25&id=123#comment-456'
    ],
    [
        'https://www.example.com:8080/post?id=123&country=%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0',
        'https://www.example.com:8080/post?country=Украина&id=123'
    ]
];


const ENCODED_URI: string = '/country/%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0';
const DECODED_URI: string = '/country/Украина';


describe('Uri', () => {
    describe('#constructor()', () => {
        it(`does not throw if 'uri' argument is undefined`, () => {
            let uri: Uri = null;

            expect(() => {
                uri = new Uri(undefined);
            }).not.toThrow();

            expect(uri.path).toBe('/');
        });

        it(`throws if 'uri' argument is null`, () => {
            expect(() => {
                return new Uri(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'uri' argument is empty string`, () => {
            expect(() => {
                return new Uri('');
            }).toThrowError(UriFormatException);
        });

        it('create new instance of Uri class', () => {
            let url: Uri = null;

            expect(function () {
                url = Uri.parse(uriAttributesFixtures[0].key);
            }).not.toThrow();

            expect(url).toBeInstanceOf(Uri);
        });
    });


    describe(`Uri.parse()`, () => {
        it (`throws if 'uri' argument is undefined`, () => {
            expect(() => {
                Uri.parse(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it (`throws if 'uri' argument is null`, () => {
            expect(() => {
                Uri.parse(null);
            }).toThrowError(ArgumentNullException);
        });

        it('parses given URI string', () => {
            for (let {key, value} of uriAttributesFixtures) {
                let uri: Uri = Uri.parse(key);
                let attributes: IUriAttributes = value;

                Object.keys(attributes).forEach((attributeName: string): void => {
                    expect(uri[attributeName] + '').toEqual(attributes[attributeName] + '');
                });
            }
        });

        it(`parses URI-encoded data`, () => {
            let uri: Uri = Uri.parse('/getCities?country=%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0&region=1056');

            expect(uri.query.length).toBe(2);
            expect(uri.query.findByKey('country')).toBe('Украина');
            expect(uri.query.findByKey('region')).toBe('1056');
        });
    });


    describe('Uri.encode()', () => {
        it(`throws if 'uri' argument is undefined`, () => {
            expect(() => {
                Uri.encode(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'uri' argument is null`, () => {
            expect(() => {
                Uri.encode(null);
            }).toThrowError(ArgumentNullException);
        });

        it(`returns percent-encoded URI`, () => {
            expect(Uri.encode(DECODED_URI)).toBe(ENCODED_URI);
        });
    });


    describe('Uri.decode()', () => {
        it(`throws if 'uri' argument is undefined`, () => {
            expect(() => {
                Uri.decode(undefined);
            }).toThrowError(ArgumentNullException);
        });

        it(`throws if 'uri' argument is null`, () => {
            expect(() => {
                Uri.decode(null);
            }).toThrowError(ArgumentNullException);
        });

        it('returns decoded URI', () => {
            expect(Uri.decode(ENCODED_URI)).toBe(DECODED_URI);
        });
    });


    describe('#equals()', () => {
        it('checks equality of Uri instances', () => {
            URL_VARIANTS.forEach((variants: string[]) => {
                let url1: Uri = Uri.parse(variants[0]);
                let url2: Uri = Uri.parse(variants[1]);

                expect(url1.equals(url2)).toEqual(true);
            });
        });
    });


    describe('#toString()', () => {
        it('stringify URI', () => {
            for (let {key} of uriAttributesFixtures) {
                let url: Uri = Uri.parse(key);

                expect(url.toString()).toEqual(key);
            }
        });
    });


    describe('#toJSON()', () => {
        it('return string representation of class instance', () => {
            for (let {key} of uriAttributesFixtures) {
                let url: Uri = Uri.parse(key);

                expect(url.toJSON()).toEqual(key);
            }
        });
    });


    describe('#clone()', () => {
        it('creates deep copy of current instance', () => {
            for (let {key, value} of uriAttributesFixtures) {
                let url: Uri = Uri.parse(key);
                let clone: Uri = url.clone();

                Object.keys(value).forEach((attributeName: string) => {
                    expect(clone[attributeName] + '').toEqual(value[attributeName] + '');
                });

                expect(clone.toString()).toEqual(key);
            }
        });
    });
});