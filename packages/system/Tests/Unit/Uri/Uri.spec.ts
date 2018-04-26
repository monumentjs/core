import {UriAttributes} from '../../../Net/Uri/UriAttributes';
import {Uri} from '../../../Net/Uri/Uri';
import {UriFormatException} from '../../../Net/Uri/UriFormatException';
import uriAttributesFixtures from './fixtures/UriAttributesFixture';

const URI_VARIANTS = [
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
            let uri: Uri = new Uri(undefined);

            assert.equals(uri.path, '/');
        });

        it(`throws if 'uri' argument is empty string`, () => {
            expect(() => {
                return new Uri('');
            }).toThrowError(UriFormatException);
        });

        it('register new instance of Uri class', () => {
            let uri: Uri = Uri.parse(uriAttributesFixtures[0].key);

            expect(uri).toBeInstanceOf(Uri);
        });
    });


    describe('Uri.encode()', () => {
        it(`returns percent-encoded URI`, () => {
            assert.equals(Uri.encode(DECODED_URI), ENCODED_URI);
        });
    });


    describe('Uri.decode()', () => {
        it('returns decoded URI', () => {
            assert.equals(Uri.decode(ENCODED_URI), DECODED_URI);
        });
    });


    describe(`Uri.parse()`, () => {
        it('parses given URI string', () => {
            for (let {key, value} of uriAttributesFixtures) {
                let uri: Uri = Uri.parse(key);
                let attributes: UriAttributes = value;

                expect(uri).toBeInstanceOf(Uri);

                Object.keys(attributes).forEach((attributeName: string): void => {
                    assert.equals((uri as any)[attributeName] + '', (attributes as any)[attributeName] + '');
                });
            }
        });

        it(`parses URI-encoded data`, () => {
            let uri: Uri = Uri.parse('/getCities?country=%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0&region=1056');

            assert.equals(uri.query.length, 2);
            assert.equals(uri.query.get('country'), 'Украина');
            assert.equals(uri.query.get('region'), '1056');
        });
    });


    describe('#equals()', () => {
        it('checks equality of Uri instances', () => {
            URI_VARIANTS.forEach((variants: string[]) => {
                let uri1: Uri = Uri.parse(variants[0]);
                let uri2: Uri = Uri.parse(variants[1]);

                assert.true(uri1.equals(uri2));
            });
        });
    });


    describe('#toString()', () => {
        it('stringify URI', () => {
            for (let {key} of uriAttributesFixtures) {
                let uri: Uri = Uri.parse(key);

                assert.equals(uri.toString(), key);
            }
        });
    });


    describe('#toJSON()', () => {
        it('return string representation of class instance', () => {
            for (let {key} of uriAttributesFixtures) {
                let uri: Uri = Uri.parse(key);

                assert.equals(uri.toJSON(), key);
            }
        });
    });


    describe('#clone()', () => {
        it('creates deep copy of current instance', () => {
            for (let {key, value} of uriAttributesFixtures) {
                let uri: Uri = Uri.parse(key);
                let clone: Uri = uri.clone();

                expect(clone).toBeInstanceOf(Uri);

                Object.keys(value).forEach((attributeName: string) => {
                    assert.equals((clone as any)[attributeName] + '', value[attributeName] + '');
                });

                assert.equals(clone.toString(), key);
            }
        });
    });
});
