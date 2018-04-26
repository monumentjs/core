import {ArgumentRangeException} from '@monument/core/main/exceptions/ArgumentRangeException';
import {EMPTY_STRING} from '@monument/core/main/constants';
import {ArrayList} from '@monument/collections/main/ArrayList';
import {Test} from '@monument/test-drive/main/configuration/decorators/Test';
import {Assert} from '@monument/test-drive/main/assert/Assert';
import {StringUtils} from '../../main/StringUtils';


export class StringUtilsTest {

    @Test
    public hasText(assert: Assert) {
        assert.false(StringUtils.hasText(EMPTY_STRING));
        assert.false(StringUtils.hasText(' '));
        assert.false(StringUtils.hasText('\t'));
        assert.false(StringUtils.hasText('\v'));
        assert.false(StringUtils.hasText('\r'));
        assert.false(StringUtils.hasText('\n'));
        assert.true(StringUtils.hasText('Line'));
    }


    @Test
    public getCharacters(assert: Assert) {
        assert.identical(StringUtils.getCharacters(EMPTY_STRING), []);
        assert.identical(StringUtils.getCharacters('Hi'), ['H', 'i']);
    }


    @Test
    public getWords(assert: Assert) {
        assert.identical(StringUtils.getWords(''), []);
        assert.identical(StringUtils.getWords(' '), []);
        assert.identical(StringUtils.getWords('\n'), []);
        assert.identical(StringUtils.getWords('\r'), []);
        assert.identical(StringUtils.getWords('\r\n'), []);
        assert.identical(StringUtils.getWords('Hello\nMy name is Alex'), ['Hello', 'My', 'name', 'is', 'Alex']);
        assert.identical(StringUtils.getWords('name'), ['name']);
        assert.identical(StringUtils.getWords('createdAt'), ['created', 'At']);
        assert.identical(StringUtils.getWords('hasContactInformation'), ['has', 'Contact', 'Information']);
        assert.identical(StringUtils.getWords('fromXML'), ['from', 'XML']);
        assert.identical(StringUtils.getWords('XMLHttpRequest'), ['XMLHttp', 'Request']);
        assert.identical(StringUtils.getWords('XmlHttpRequest'), ['Xml', 'Http', 'Request']);
        assert.identical(StringUtils.getWords('TooToughToDie'), ['Too', 'Tough', 'To', 'Die']);
        assert.identical(StringUtils.getWords('person.name.length'), ['person', 'name', 'length']);
        assert.identical(StringUtils.getWords('.page-container'), ['page', 'container']);
        assert.identical(
            StringUtils.getWords('/api/contacts/list/{offset}/{limit}'),
            ['api', 'contacts', 'list', 'offset', 'limit']
        );
        assert.identical(StringUtils.getWords('MAX_NUMBER_VALUE'), ['MAX', 'NUMBER', 'VALUE']);
    }


    @Test
    public toSnakeCase(assert: Assert) {
        assert.equals(StringUtils.toSnakeCase(''), '');
        assert.equals(StringUtils.toSnakeCase(' '), '');
        assert.equals(StringUtils.toSnakeCase('\n'), '');
        assert.equals(StringUtils.toSnakeCase('\r'), '');
        assert.equals(StringUtils.toSnakeCase('\r\n'), '');
        assert.equals(StringUtils.toSnakeCase('Hello\nMy name is Alex'), 'hello_my_name_is_alex');
        assert.equals(StringUtils.toSnakeCase('name'), 'name');
        assert.equals(StringUtils.toSnakeCase('createdAt'), 'created_at');
        assert.equals(StringUtils.toSnakeCase('hasContactInformation'), 'has_contact_information');
        assert.equals(StringUtils.toSnakeCase('fromXML'), 'from_xml');
        assert.equals(StringUtils.toSnakeCase('XMLHttpRequest'), 'xmlhttp_request');
        assert.equals(StringUtils.toSnakeCase('XmlHttpRequest'), 'xml_http_request');
        assert.equals(StringUtils.toSnakeCase('TooToughToDie'), 'too_tough_to_die');
        assert.equals(StringUtils.toSnakeCase('person.name.length'), 'person_name_length');
        assert.equals(StringUtils.toSnakeCase('.page-container'), 'page_container');
        assert.equals(StringUtils.toSnakeCase('/api/contacts/list/{offset}/{limit}'), 'api_contacts_list_offset_limit');
        assert.equals(StringUtils.toSnakeCase('MAX_NUMBER_VALUE'), 'max_number_value');
    }


    @Test
    public toKebabCase(assert: Assert) {
        assert.equals(StringUtils.toKebabCase(''), '');
        assert.equals(StringUtils.toKebabCase(' '), '');
        assert.equals(StringUtils.toKebabCase('\n'), '');
        assert.equals(StringUtils.toKebabCase('\r'), '');
        assert.equals(StringUtils.toKebabCase('\r\n'), '');
        assert.equals(StringUtils.toKebabCase('Hello\nMy name is Alex'), 'hello-my-name-is-alex');
        assert.equals(StringUtils.toKebabCase('name'), 'name');
        assert.equals(StringUtils.toKebabCase('createdAt'), 'created-at');
        assert.equals(StringUtils.toKebabCase('hasContactInformation'), 'has-contact-information');
        assert.equals(StringUtils.toKebabCase('fromXML'), 'from-xml');
        assert.equals(StringUtils.toKebabCase('XMLHttpRequest'), 'xmlhttp-request');
        assert.equals(StringUtils.toKebabCase('XmlHttpRequest'), 'xml-http-request');
        assert.equals(StringUtils.toKebabCase('TooToughToDie'), 'too-tough-to-die');
        assert.equals(StringUtils.toKebabCase('person.name.length'), 'person-name-length');
        assert.equals(StringUtils.toKebabCase('.page-container'), 'page-container');
        assert.equals(StringUtils.toKebabCase('/api/contacts/list/{offset}/{limit}'), 'api-contacts-list-offset-limit');
        assert.equals(StringUtils.toKebabCase('MAX_NUMBER_VALUE'), 'max-number-value');
    }


    @Test
    public toCamelCase(assert: Assert) {
        assert.equals(StringUtils.toCamelCase(''), '');
        assert.equals(StringUtils.toCamelCase(' '), '');
        assert.equals(StringUtils.toCamelCase('\n'), '');
        assert.equals(StringUtils.toCamelCase('\r'), '');
        assert.equals(StringUtils.toCamelCase('\r\n'), '');
        assert.equals(StringUtils.toCamelCase('Hello\nMy name is Alex'), 'helloMyNameIsAlex');
        assert.equals(StringUtils.toCamelCase('name'), 'name');
        assert.equals(StringUtils.toCamelCase('createdAt'), 'createdAt');
        assert.equals(StringUtils.toCamelCase('hasContactInformation'), 'hasContactInformation');
        assert.equals(StringUtils.toCamelCase('fromXML'), 'fromXml');
        assert.equals(StringUtils.toCamelCase('XMLHttpRequest'), 'xmlhttpRequest');
        assert.equals(StringUtils.toCamelCase('XmlHttpRequest'), 'xmlHttpRequest');
        assert.equals(StringUtils.toCamelCase('TooToughToDie'), 'tooToughToDie');
        assert.equals(StringUtils.toCamelCase('person.name.length'), 'personNameLength');
        assert.equals(StringUtils.toCamelCase('.page-container'), 'pageContainer');
        assert.equals(StringUtils.toCamelCase('/api/contacts/list/{offset}/{limit}'), 'apiContactsListOffsetLimit');
        assert.equals(StringUtils.toCamelCase('MAX_NUMBER_VALUE'), 'maxNumberValue');
    }


    @Test
    public toCapitalCase(assert: Assert) {
        assert.equals(StringUtils.toCapitalCase(''), '');
        assert.equals(StringUtils.toCapitalCase(' '), '');
        assert.equals(StringUtils.toCapitalCase('\n'), '');
        assert.equals(StringUtils.toCapitalCase('\r'), '');
        assert.equals(StringUtils.toCapitalCase('\r\n'), '');
        assert.equals(StringUtils.toCapitalCase('Hello\nMy name is Alex'), 'HelloMyNameIsAlex');
        assert.equals(StringUtils.toCapitalCase('name'), 'Name');
        assert.equals(StringUtils.toCapitalCase('createdAt'), 'CreatedAt');
        assert.equals(StringUtils.toCapitalCase('hasContactInformation'), 'HasContactInformation');
        assert.equals(StringUtils.toCapitalCase('fromXML'), 'FromXml');
        assert.equals(StringUtils.toCapitalCase('XMLHttpRequest'), 'XmlhttpRequest');
        assert.equals(StringUtils.toCapitalCase('XmlHttpRequest'), 'XmlHttpRequest');
        assert.equals(StringUtils.toCapitalCase('TooToughToDie'), 'TooToughToDie');
        assert.equals(StringUtils.toCapitalCase('person.name.length'), 'PersonNameLength');
        assert.equals(StringUtils.toCapitalCase('.page-container'), 'PageContainer');
        assert.equals(StringUtils.toCapitalCase('/api/contacts/list/{offset}/{limit}'), 'ApiContactsListOffsetLimit');
        assert.equals(StringUtils.toCapitalCase('MAX_NUMBER_VALUE'), 'MaxNumberValue');
    }


    @Test
    public split(assert: Assert) {
        assert.identical(StringUtils.split('', ''), []);
        assert.identical(StringUtils.split('12', ''), ['1', '2']);
        assert.identical(StringUtils.split('1 2', ' '), ['1', '2']);
        assert.identical(StringUtils.split('a += 2', ' +='), ['a', '2']);
        assert.identical(StringUtils.split('a += 2', '+='), ['a', '2']);
        assert.identical(StringUtils.split('a + b', '+'), ['a', 'b']);
        assert.identical(StringUtils.split('a + b', '+', false), ['a ', ' b']);
        assert.identical(StringUtils.split('a ++ b', '+', false, false), ['a ', '', ' b']);
    }


    @Test
    public trimLeft(assert: Assert) {
        assert.equals(StringUtils.trimLeft('\ntext'), 'text');
        assert.equals(StringUtils.trimLeft('\n'), '');
        assert.equals(StringUtils.trimLeft(''), '');
    }


    @Test
    public trimRight(assert: Assert) {
        assert.equals(StringUtils.trimRight('text\n'), 'text');
        assert.equals(StringUtils.trimRight('\n'), '');
        assert.equals(StringUtils.trimRight(''), '');
    }


    @Test
    public trim(assert: Assert) {
        assert.equals(StringUtils.trim('text\n'), 'text');
        assert.equals(StringUtils.trim('\n'), '');
        assert.equals(StringUtils.trim(''), '');
    }


    @Test
    public isUpperCase(assert: Assert) {
        assert.true(StringUtils.isUpperCase('TEXT'));
        assert.false(StringUtils.isUpperCase('Text'));
        assert.false(StringUtils.isUpperCase('text'));
        assert.true(StringUtils.isUpperCase('123'));
        assert.true(StringUtils.isUpperCase('\n'));
        assert.true(StringUtils.isUpperCase(' '));
        assert.true(StringUtils.isUpperCase(''));
    }


    @Test
    public isLowerCase(assert: Assert) {
        assert.false(StringUtils.isLowerCase('TEXT'));
        assert.false(StringUtils.isLowerCase('Text'));
        assert.true(StringUtils.isLowerCase('text'));
        assert.true(StringUtils.isLowerCase('123'));
        assert.true(StringUtils.isLowerCase('\n'));
        assert.true(StringUtils.isLowerCase(' '));
        assert.true(StringUtils.isLowerCase(''));
    }


    @Test
    public collectionToDelimitedString(assert: Assert) {
        assert.equals(StringUtils.collectionToDelimitedString(new ArrayList([]), ' '), '');

        assert.equals(StringUtils.collectionToDelimitedString(new ArrayList([
            'text'
        ]), ' '), 'text');

        assert.equals(StringUtils.collectionToDelimitedString(new ArrayList([
            'text', 'value'
        ]), ' '), 'text value');

        assert.equals(StringUtils.collectionToDelimitedString(new ArrayList([
            'text', 'value'
        ]), ' ', '<'), '<text <value');

        assert.equals(StringUtils.collectionToDelimitedString(new ArrayList([
            'text', 'value'
        ]), ' ', '<', '>'), '<text> <value>');
    }


    @Test
    public padStart(assert: Assert) {
        assert.throws(() => {
            return StringUtils.padStart('text', -1);
        }, ArgumentRangeException);
        assert.equals(StringUtils.padStart('text', 0), 'text');
        assert.equals(StringUtils.padStart('text', 3), 'text');
        assert.equals(StringUtils.padStart('text', 6), '  text');
        assert.equals(StringUtils.padStart('text', 6, ' '), '  text');
    }


    @Test
    public padEnd(assert: Assert) {
        assert.throws(() => {
            return StringUtils.padEnd('text', -1);
        }, ArgumentRangeException);
        assert.equals(StringUtils.padEnd('text', 0), 'text');
        assert.equals(StringUtils.padEnd('text', 3), 'text');
        assert.equals(StringUtils.padEnd('text', 6), 'text  ');
        assert.equals(StringUtils.padEnd('text', 6, ' '), 'text  ');
    }


    @Test
    public clipStart(assert: Assert) {
        assert.throws(() => {
            return StringUtils.clipStart('text', -1);
        }, ArgumentRangeException);
        assert.equals(StringUtils.clipStart('text', 0), '');
        assert.equals(StringUtils.clipStart('text', 3), 'tex');
        assert.equals(StringUtils.clipStart('text', 6), 'text');
    }


    @Test
    public clipEnd(assert: Assert) {
        assert.throws(() => {
            return StringUtils.clipEnd('text', -1);
        }, ArgumentRangeException);
        assert.equals(StringUtils.clipEnd('text', 0), '');
        assert.equals(StringUtils.clipEnd('text', 3), 'ext');
        assert.equals(StringUtils.clipEnd('text', 6), 'text');
    }
}
