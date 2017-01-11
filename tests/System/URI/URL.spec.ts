import URL from '../../../lib/System/URI/URL';
import {URLAttributes} from '../../../lib/System/URI/types';
import {Pool} from '../../../lib/Core/types';


const URL_SAMPLES = [
    'https://www.example.com:8080/post?id=123#comment-456',
    '//www.example.com:8080/post?id=123#comment-456',
    '//www.example.com/post?id=123#comment-456',
    '//www.example.com/post?id=123',
    '//www.example.com/post',
    '/post'
];


const URL_ATTRIBUTES: Pool<URLAttributes> = {
    [URL_SAMPLES[0]]: {
        protocol: 'https',
        host: 'www.example.com',
        port: 8080,
        path: '/post',
        search: 'id=123',
        hash: 'comment-456'
    },
    [URL_SAMPLES[1]]: {
        host: 'www.example.com',
        port: 8080,
        path: '/post',
        search: 'id=123',
        hash: 'comment-456'
    },
    [URL_SAMPLES[2]]: {
        host: 'www.example.com',
        path: '/post',
        search: 'id=123',
        hash: 'comment-456'
    },
    [URL_SAMPLES[3]]: {
        host: 'www.example.com',
        path: '/post',
        search: 'id=123'
    },
    [URL_SAMPLES[4]]: {
        host: 'www.example.com',
        path: '/post'
    },
    [URL_SAMPLES[5]]: {
        path: '/post'
    }
};


describe('Net.URL', () => {
    describe('#constructor()', () => {
        it('should create new instance of URL class', () => {
            let url: URL = null;

            expect(function () {
                url = URL.parse(URL_SAMPLES[0]);
            }).not.toThrow();

            expect(url).toBeInstanceOf(URL);
        });


        it('should parse given URL string', () => {
            URL_SAMPLES.forEach((sampleURL: string) => {
                let url: URL = URL.parse(sampleURL);
                let attributes: URLAttributes = URL_ATTRIBUTES[sampleURL];

                Object.keys(attributes).forEach((key: string) => {
                    expect(url[key]).toEqual(attributes[key]);
                });

                expect(url.toJSON()).toEqual(attributes);
            });
        });
    });


    describe('#toString()', () => {
        it('should stringify URL', () => {
            URL_SAMPLES.forEach((sampleURL: string) => {
                let url: URL = URL.parse(sampleURL);

                expect(url.toString()).toEqual(sampleURL);
            });
        });
    });


    describe('#toJSON()', () => {
        it('should return URL attributes as simple object', () => {
            URL_SAMPLES.forEach((sampleURL: string) => {
                let url: URL = URL.parse(sampleURL);
                let attributes: URLAttributes = URL_ATTRIBUTES[sampleURL];

                expect(url.toJSON()).toEqual(attributes);
            });
        });
    });


    describe('#clone()', () => {
        it('should clone current instance', () => {
            URL_SAMPLES.forEach((sampleURL: string) => {
                let url: URL = URL.parse(sampleURL);
                let clone: URL = url.clone();
                let attributes: URLAttributes = URL_ATTRIBUTES[sampleURL];

                Object.keys(attributes).forEach((key: string) => {
                    expect(clone[key]).toEqual(attributes[key]);
                });

                expect(clone.toJSON()).toEqual(attributes);
                expect(clone.toString()).toEqual(sampleURL);
            });
        });
    });
});