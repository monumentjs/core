import {ArrayList, RangeException, EMPTY_STRING, StringUtils} from '../../..';

describe('StringUtils', function () {

    it('hasText()', function () {
        expect(StringUtils.hasText(EMPTY_STRING)).toBe(false);
        expect(StringUtils.hasText(' ')).toBe(false);
        expect(StringUtils.hasText('\t')).toBe(false);
        expect(StringUtils.hasText('\v')).toBe(false);
        expect(StringUtils.hasText('\r')).toBe(false);
        expect(StringUtils.hasText('\n')).toBe(false);
        expect(StringUtils.hasText('Line')).toBe(true);
    });

    it('getCharacters()', function () {
        expect(StringUtils.getCharacters(EMPTY_STRING)).toEqual([]);
        expect(StringUtils.getCharacters('Hi')).toEqual(['H', 'i']);
    });

    it('getWords()', function () {
        expect(StringUtils.getWords('')).toEqual([]);
        expect(StringUtils.getWords(' ')).toEqual([]);
        expect(StringUtils.getWords('\n')).toEqual([]);
        expect(StringUtils.getWords('\r')).toEqual([]);
        expect(StringUtils.getWords('\r\n')).toEqual([]);
        expect(StringUtils.getWords('Hello\nMy name is Alex')).toEqual(['Hello', 'My', 'name', 'is', 'Alex']);
        expect(StringUtils.getWords('name')).toEqual(['name']);
        expect(StringUtils.getWords('createdAt')).toEqual(['created', 'At']);
        expect(StringUtils.getWords('hasContactInformation')).toEqual(['has', 'Contact', 'Information']);
        expect(StringUtils.getWords('fromXML')).toEqual(['from', 'XML']);
        expect(StringUtils.getWords('XMLHttpRequest')).toEqual(['XMLHttp', 'Request']);
        expect(StringUtils.getWords('XmlHttpRequest')).toEqual(['Xml', 'Http', 'Request']);
        expect(StringUtils.getWords('TooToughToDie')).toEqual(['Too', 'Tough', 'To', 'Die']);
        expect(StringUtils.getWords('person.name.length')).toEqual(['person', 'name', 'length']);
        expect(StringUtils.getWords('.page-container')).toEqual(['page', 'container']);
        expect(
            StringUtils.getWords('/api/contacts/list/{offset}/{limit}')).toEqual(
            ['api', 'contacts', 'list', 'offset', 'limit']
        );
        expect(StringUtils.getWords('MAX_NUMBER_VALUE')).toEqual(['MAX', 'NUMBER', 'VALUE']);
    });

    it('toSnakeCase()', function () {
        expect(StringUtils.toSnakeCase('')).toBe('');
        expect(StringUtils.toSnakeCase(' ')).toBe('');
        expect(StringUtils.toSnakeCase('\n')).toBe('');
        expect(StringUtils.toSnakeCase('\r')).toBe('');
        expect(StringUtils.toSnakeCase('\r\n')).toBe('');
        expect(StringUtils.toSnakeCase('Hello\nMy name is Alex')).toBe('hello_my_name_is_alex');
        expect(StringUtils.toSnakeCase('name')).toBe('name');
        expect(StringUtils.toSnakeCase('createdAt')).toBe('created_at');
        expect(StringUtils.toSnakeCase('hasContactInformation')).toBe('has_contact_information');
        expect(StringUtils.toSnakeCase('fromXML')).toBe('from_xml');
        expect(StringUtils.toSnakeCase('XMLHttpRequest')).toBe('xmlhttp_request');
        expect(StringUtils.toSnakeCase('XmlHttpRequest')).toBe('xml_http_request');
        expect(StringUtils.toSnakeCase('TooToughToDie')).toBe('too_tough_to_die');
        expect(StringUtils.toSnakeCase('person.name.length')).toBe('person_name_length');
        expect(StringUtils.toSnakeCase('.page-container')).toBe('page_container');
        expect(StringUtils.toSnakeCase('/api/contacts/list/{offset}/{limit}')).toBe('api_contacts_list_offset_limit');
        expect(StringUtils.toSnakeCase('MAX_NUMBER_VALUE')).toBe('max_number_value');
    });

    it('toKebabCase()', function () {
        expect(StringUtils.toKebabCase('')).toBe('');
        expect(StringUtils.toKebabCase(' ')).toBe('');
        expect(StringUtils.toKebabCase('\n')).toBe('');
        expect(StringUtils.toKebabCase('\r')).toBe('');
        expect(StringUtils.toKebabCase('\r\n')).toBe('');
        expect(StringUtils.toKebabCase('Hello\nMy name is Alex')).toBe('hello-my-name-is-alex');
        expect(StringUtils.toKebabCase('name')).toBe('name');
        expect(StringUtils.toKebabCase('createdAt')).toBe('created-at');
        expect(StringUtils.toKebabCase('hasContactInformation')).toBe('has-contact-information');
        expect(StringUtils.toKebabCase('fromXML')).toBe('from-xml');
        expect(StringUtils.toKebabCase('XMLHttpRequest')).toBe('xmlhttp-request');
        expect(StringUtils.toKebabCase('XmlHttpRequest')).toBe('xml-http-request');
        expect(StringUtils.toKebabCase('TooToughToDie')).toBe('too-tough-to-die');
        expect(StringUtils.toKebabCase('person.name.length')).toBe('person-name-length');
        expect(StringUtils.toKebabCase('.page-container')).toBe('page-container');
        expect(StringUtils.toKebabCase('/api/contacts/list/{offset}/{limit}')).toBe('api-contacts-list-offset-limit');
        expect(StringUtils.toKebabCase('MAX_NUMBER_VALUE')).toBe('max-number-value');
    });

    it('toCamelCase()', function () {
        expect(StringUtils.toCamelCase('')).toBe('');
        expect(StringUtils.toCamelCase(' ')).toBe('');
        expect(StringUtils.toCamelCase('\n')).toBe('');
        expect(StringUtils.toCamelCase('\r')).toBe('');
        expect(StringUtils.toCamelCase('\r\n')).toBe('');
        expect(StringUtils.toCamelCase('Hello\nMy name is Alex')).toBe('helloMyNameIsAlex');
        expect(StringUtils.toCamelCase('name')).toBe('name');
        expect(StringUtils.toCamelCase('createdAt')).toBe('createdAt');
        expect(StringUtils.toCamelCase('hasContactInformation')).toBe('hasContactInformation');
        expect(StringUtils.toCamelCase('fromXML')).toBe('fromXml');
        expect(StringUtils.toCamelCase('XMLHttpRequest')).toBe('xmlhttpRequest');
        expect(StringUtils.toCamelCase('XmlHttpRequest')).toBe('xmlHttpRequest');
        expect(StringUtils.toCamelCase('TooToughToDie')).toBe('tooToughToDie');
        expect(StringUtils.toCamelCase('person.name.length')).toBe('personNameLength');
        expect(StringUtils.toCamelCase('.page-container')).toBe('pageContainer');
        expect(StringUtils.toCamelCase('/api/contacts/list/{offset}/{limit}')).toBe('apiContactsListOffsetLimit');
        expect(StringUtils.toCamelCase('MAX_NUMBER_VALUE')).toBe('maxNumberValue');
    });

    it('toCapitalCase()', function () {
        expect(StringUtils.toCapitalCase('')).toBe('');
        expect(StringUtils.toCapitalCase(' ')).toBe('');
        expect(StringUtils.toCapitalCase('\n')).toBe('');
        expect(StringUtils.toCapitalCase('\r')).toBe('');
        expect(StringUtils.toCapitalCase('\r\n')).toBe('');
        expect(StringUtils.toCapitalCase('Hello\nMy name is Alex')).toBe('HelloMyNameIsAlex');
        expect(StringUtils.toCapitalCase('name')).toBe('Name');
        expect(StringUtils.toCapitalCase('createdAt')).toBe('CreatedAt');
        expect(StringUtils.toCapitalCase('hasContactInformation')).toBe('HasContactInformation');
        expect(StringUtils.toCapitalCase('fromXML')).toBe('FromXml');
        expect(StringUtils.toCapitalCase('XMLHttpRequest')).toBe('XmlhttpRequest');
        expect(StringUtils.toCapitalCase('XmlHttpRequest')).toBe('XmlHttpRequest');
        expect(StringUtils.toCapitalCase('TooToughToDie')).toBe('TooToughToDie');
        expect(StringUtils.toCapitalCase('person.name.length')).toBe('PersonNameLength');
        expect(StringUtils.toCapitalCase('.page-container')).toBe('PageContainer');
        expect(StringUtils.toCapitalCase('/api/contacts/list/{offset}/{limit}')).toBe('ApiContactsListOffsetLimit');
        expect(StringUtils.toCapitalCase('MAX_NUMBER_VALUE')).toBe('MaxNumberValue');
    });

    it('split()', function () {
        expect(StringUtils.split('', '')).toEqual([]);
        expect(StringUtils.split('12', '')).toEqual(['1', '2']);
        expect(StringUtils.split('1 2', ' ')).toEqual(['1', '2']);
        expect(StringUtils.split('a += 2', ' +=')).toEqual(['a', '2']);
        expect(StringUtils.split('a += 2', '+=')).toEqual(['a', '2']);
        expect(StringUtils.split('a + b', '+')).toEqual(['a', 'b']);
        expect(StringUtils.split('a + b', '+', false)).toEqual(['a ', ' b']);
        expect(StringUtils.split('a ++ b', '+', false, false)).toEqual(['a ', '', ' b']);
    });

    it('trimLeft()', function () {
        expect(StringUtils.trimLeft('\ntext')).toBe('text');
        expect(StringUtils.trimLeft('\n')).toBe('');
        expect(StringUtils.trimLeft('')).toBe('');
    });

    it('trimRight()', function () {
        expect(StringUtils.trimRight('text\n')).toBe('text');
        expect(StringUtils.trimRight('\n')).toBe('');
        expect(StringUtils.trimRight('')).toBe('');
    });

    it('trim()', function () {
        expect(StringUtils.trim('text\n')).toBe('text');
        expect(StringUtils.trim('\n')).toBe('');
        expect(StringUtils.trim('')).toBe('');
    });

    it('isUpperCase()', function () {
        expect(StringUtils.isUpperCase('TEXT')).toBe(true);
        expect(StringUtils.isUpperCase('Text')).toBe(false);
        expect(StringUtils.isUpperCase('text')).toBe(false);
        expect(StringUtils.isUpperCase('123')).toBe(true);
        expect(StringUtils.isUpperCase('\n')).toBe(true);
        expect(StringUtils.isUpperCase(' ')).toBe(true);
        expect(StringUtils.isUpperCase('')).toBe(true);
    });

    it('isLowerCase()', function () {
        expect(StringUtils.isLowerCase('TEXT')).toBe(false);
        expect(StringUtils.isLowerCase('Text')).toBe(false);
        expect(StringUtils.isLowerCase('text')).toBe(true);
        expect(StringUtils.isLowerCase('123')).toBe(true);
        expect(StringUtils.isLowerCase('\n')).toBe(true);
        expect(StringUtils.isLowerCase(' ')).toBe(true);
        expect(StringUtils.isLowerCase('')).toBe(true);
    });

    it('collectionToDelimitedString()', function () {
        expect(StringUtils.collectionToDelimitedString(new ArrayList([]), ' ')).toBe('');

        expect(StringUtils.collectionToDelimitedString(new ArrayList([
            'text'
        ]), ' ')).toBe('text');

        expect(StringUtils.collectionToDelimitedString(new ArrayList([
            'text', 'value'
        ]), ' ')).toBe('text value');

        expect(StringUtils.collectionToDelimitedString(new ArrayList([
            'text', 'value'
        ]), ' ', '<')).toBe('<text <value');

        expect(StringUtils.collectionToDelimitedString(new ArrayList([
            'text', 'value'
        ]), ' ', '<', '>')).toBe('<text> <value>');
    });

    it('padStart()', function () {
        expect(() => {
            StringUtils.padStart('text', -1);
        }).toThrow(RangeException);
        expect(StringUtils.padStart('text', 0)).toBe('text');
        expect(StringUtils.padStart('text', 3)).toBe('text');
        expect(StringUtils.padStart('text', 6)).toBe('  text');
        expect(StringUtils.padStart('text', 6, ' ')).toBe('  text');
    });

    it('padEnd()', function () {
        expect(() => {
            StringUtils.padEnd('text', -1);
        }).toThrow(RangeException);
        expect(StringUtils.padEnd('text', 0)).toBe('text');
        expect(StringUtils.padEnd('text', 3)).toBe('text');
        expect(StringUtils.padEnd('text', 6)).toBe('text  ');
        expect(StringUtils.padEnd('text', 6, ' ')).toBe('text  ');
    });

    it('clipStart()', function () {
        expect(() => {
            StringUtils.clipStart('text', -1);
        }).toThrow(RangeException);
        expect(StringUtils.clipStart('text', 0)).toBe('');
        expect(StringUtils.clipStart('text', 3)).toBe('tex');
        expect(StringUtils.clipStart('text', 6)).toBe('text');
    });

    it('clipEnd()', function () {
        expect(() => {
            StringUtils.clipEnd('text', -1);
        }).toThrow(RangeException);
        expect(StringUtils.clipEnd('text', 0)).toBe('');
        expect(StringUtils.clipEnd('text', 3)).toBe('ext');
        expect(StringUtils.clipEnd('text', 6)).toBe('text');
    });
});
