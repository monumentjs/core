import { UriString } from '../../../src/parsing/uri/UriString';

describe('UriString', function() {
  describe('constructor(string)', function() {
    describe('http(s)', function() {
      it('http://alex:secret@site.com:8080/path/to/resource?a=1&b=2#section', function() {
        expect(new UriString('http://alex:secret@site.com:8080/path/to/resource?a=1&b=2#section')).toEqual({
          scheme: 'http',
          authority: 'alex:secret@site.com:8080',
          path: '/path/to/resource',
          query: 'a=1&b=2',
          fragment: 'section'
        });
      });

      it('//alex:secret@site.com:8080/path/to/resource?a=1&b=2#section', function() {
        expect(new UriString('//alex:secret@site.com:8080/path/to/resource?a=1&b=2#section')).toEqual({
          authority: 'alex:secret@site.com:8080',
          path: '/path/to/resource',
          query: 'a=1&b=2',
          fragment: 'section'
        });
      });

      it('//alex@site.com:8080/path/to/resource?a=1&b=2#section', function() {
        expect(new UriString('//alex@site.com:8080/path/to/resource?a=1&b=2#section')).toEqual({
          authority: 'alex@site.com:8080',
          path: '/path/to/resource',
          query: 'a=1&b=2',
          fragment: 'section'
        });
      });

      it('//site.com:8080/path/to/resource?a=1&b=2#section', function() {
        expect(new UriString('//site.com:8080/path/to/resource?a=1&b=2#section')).toEqual({
          authority: 'site.com:8080',
          path: '/path/to/resource',
          query: 'a=1&b=2',
          fragment: 'section'
        });
      });

      it('//site.com/path/to/resource?a=1&b=2#section', function() {
        expect(new UriString('//site.com/path/to/resource?a=1&b=2#section')).toEqual({
          authority: 'site.com',
          path: '/path/to/resource',
          query: 'a=1&b=2',
          fragment: 'section'
        });
      });

      it('//site.com/path/to/resource?a=1&b=2', function() {
        expect(new UriString('//site.com/path/to/resource?a=1&b=2')).toEqual({
          authority: 'site.com',
          path: '/path/to/resource',
          query: 'a=1&b=2'
        });
      });

      it('//site.com/path/to/resource#section', function() {
        expect(new UriString('//site.com/path/to/resource#section')).toEqual({
          authority: 'site.com',
          path: '/path/to/resource',
          fragment: 'section'
        });
      });

      it('//site.com/path/to/resource', function() {
        expect(new UriString('//site.com/path/to/resource')).toEqual({
          authority: 'site.com',
          path: '/path/to/resource'
        });
      });

      it('//site.com?a=1&b=2', function() {
        expect(new UriString('//site.com?a=1&b=2')).toEqual({
          authority: 'site.com',
          query: 'a=1&b=2'
        });
      });

      it('//site.com#section', function() {
        expect(new UriString('//site.com#section')).toEqual({
          authority: 'site.com',
          fragment: 'section'
        });
      });

      it('//site.com', function() {
        expect(new UriString('//site.com')).toEqual({
          authority: 'site.com'
        });
      });

      it('//site.com?', function() {
        expect(new UriString('//site.com?')).toEqual({
          authority: 'site.com'
        });
      });

      it('//site.com?#', function() {
        expect(new UriString('//site.com?#')).toEqual({
          authority: 'site.com'
        });
      });

      it('/path/to/resource?a=1&b=2#section', function() {
        expect(new UriString('/path/to/resource?a=1&b=2#section')).toEqual({
          path: '/path/to/resource',
          query: 'a=1&b=2',
          fragment: 'section'
        });
      });

      it('/path/to/resource?a=1&b=2', function() {
        expect(new UriString('/path/to/resource?a=1&b=2')).toEqual({
          path: '/path/to/resource',
          query: 'a=1&b=2'
        });
      });

      it('/path/to/resource#section', function() {
        expect(new UriString('/path/to/resource#section')).toEqual({
          path: '/path/to/resource',
          fragment: 'section'
        });
      });

      it('/path/to/resource', function() {
        expect(new UriString('/path/to/resource')).toEqual({
          path: '/path/to/resource'
        });
      });

      it('?a=1&b=2', function() {
        expect(new UriString('?a=1&b=2')).toEqual({
          query: 'a=1&b=2'
        });
      });

      it('#section', function() {
        expect(new UriString('#section')).toEqual({
          fragment: 'section'
        });
      });

      it('./relative/path', function() {
        expect(new UriString('./relative/path')).toEqual({
          path: './relative/path'
        });
      });

      it('./relative/path?a=b&c=d&e=', function() {
        expect(new UriString('./relative/path?a=b&c=d&e=')).toEqual({
          path: './relative/path',
          query: 'a=b&c=d&e='
        });
      });

      it('./relative/path?a=b&c=d&e=#section', function() {
        expect(new UriString('./relative/path?a=b&c=d&e=#section')).toEqual({
          path: './relative/path',
          query: 'a=b&c=d&e=',
          fragment: 'section'
        });
      });

      it('./relative/path#section', function() {
        expect(new UriString('./relative/path#section')).toEqual({
          path: './relative/path',
          fragment: 'section'
        });
      });
    });

    describe('ws(s):', function() {
      it('ws://site.com:8090/room/123?a=b&c=d', function() {
        expect(new UriString('ws://site.com:8090/room/123?a=b&c=d')).toEqual({
          scheme: 'ws',
          authority: 'site.com:8090',
          path: '/room/123',
          query: 'a=b&c=d'
        });
      });

      it('ws://site.com/room/123?a=b&c=d', function() {
        expect(new UriString('ws://site.com/room/123?a=b&c=d')).toEqual({
          scheme: 'ws',
          authority: 'site.com',
          path: '/room/123',
          query: 'a=b&c=d'
        });
      });

      it('ws://site.com?a=b&c=d', function() {
        expect(new UriString('ws://site.com?a=b&c=d')).toEqual({
          scheme: 'ws',
          authority: 'site.com',
          query: 'a=b&c=d'
        });
      });

      it('ws://site.com', function() {
        expect(new UriString('ws://site.com')).toEqual({
          scheme: 'ws',
          authority: 'site.com'
        });
      });
    });

    describe('ftp:', function() {
      it('ftp://alex:secret@site.com:8080/path/to/resource;type=i', function() {
        expect(new UriString('ftp://alex:secret@site.com:8080/path/to/resource;type=i')).toEqual({
          scheme: 'ftp',
          authority: 'alex:secret@site.com:8080',
          path: '/path/to/resource;type=i'
        });
      });
    });

    describe('ssh:', function() {
      it('ssh://user@example.com', function() {
        expect(new UriString('ssh://user@example.com')).toEqual({
          scheme: 'ssh',
          authority: 'user@example.com'
        });
      });

      it('ssh://user@example.com:2222', function() {
        expect(new UriString('ssh://user@example.com:2222')).toEqual({
          scheme: 'ssh',
          authority: 'user@example.com:2222'
        });
      });

      it('ssh://user;fingerprint=ssh-dss-c1-b1-30-29-d7-b8-de-6c-97-77-10-d7-46-41-63-87@example.com', function() {
        expect(new UriString('ssh://user;fingerprint=ssh-dss-c1-b1-30-29-d7-b8-de-6c-97-77-10-d7-46-41-63-87@example.com')).toEqual({
          scheme: 'ssh',
          authority: 'user;fingerprint=ssh-dss-c1-b1-30-29-d7-b8-de-6c-97-77-10-d7-46-41-63-87@example.com'
        });
      });

      it('ssh://user;fingerprint=ssh-dss-c1-b1-30-29-d7-b8-de-6c-97-77-10-d7-46-41-63-87@example.com:8080', function() {
        expect(new UriString('ssh://user;fingerprint=ssh-dss-c1-b1-30-29-d7-b8-de-6c-97-77-10-d7-46-41-63-87@example.com:8080')).toEqual({
          scheme: 'ssh',
          authority: 'user;fingerprint=ssh-dss-c1-b1-30-29-d7-b8-de-6c-97-77-10-d7-46-41-63-87@example.com:8080'
        });
      });
    });

    describe('telnet:', function() {
      it('telnet://user:password@domain.com:8080', function() {
        expect(new UriString('telnet://user:password@domain.com:8080')).toEqual({
          scheme: 'telnet',
          authority: 'user:password@domain.com:8080'
        });
      });

      it('telnet://user@domain.com:8080', function() {
        expect(new UriString('telnet://user@domain.com:8080')).toEqual({
          scheme: 'telnet',
          authority: 'user@domain.com:8080'
        });
      });

      it('telnet://user@domain.com', function() {
        expect(new UriString('telnet://user@domain.com')).toEqual({
          scheme: 'telnet',
          authority: 'user@domain.com'
        });
      });
    });

    describe('file:', function() {
      it('file://localhost/home/alex/table.xls', function() {
        expect(new UriString('file://localhost/home/alex/table.xls')).toEqual({
          scheme: 'file',
          authority: 'localhost',
          path: '/home/alex/table.xls'
        });
      });

      it('file://static.site.com/home/alex/table.xls', function() {
        expect(new UriString('file://static.site.com/home/alex/table.xls')).toEqual({
          scheme: 'file',
          authority: 'static.site.com',
          path: '/home/alex/table.xls'
        });
      });

      it('file:///home/alex/table.xls', function() {
        expect(new UriString('file:///home/alex/table.xls')).toEqual({
          scheme: 'file',
          path: '/home/alex/table.xls'
        });
      });

      it('file://localhost/c|/WINDOWS/clock.avi', function() {
        expect(new UriString('file://localhost/c|/WINDOWS/clock.avi')).toEqual({
          scheme: 'file',
          authority: 'localhost',
          path: '/c|/WINDOWS/clock.avi'
        });
      });

      it('file:///c|/WINDOWS/clock.avi', function() {
        expect(new UriString('file:///c|/WINDOWS/clock.avi')).toEqual({
          scheme: 'file',
          path: '/c|/WINDOWS/clock.avi'
        });
      });

      it('file://localhost/c:/WINDOWS/clock.avi', function() {
        expect(new UriString('file://localhost/c:/WINDOWS/clock.avi')).toEqual({
          scheme: 'file',
          authority: 'localhost',
          path: '/c:/WINDOWS/clock.avi'
        });
      });

      it('file:///c:/WINDOWS/clock.avi', function() {
        expect(new UriString('file:///c:/WINDOWS/clock.avi')).toEqual({
          scheme: 'file',
          path: '/c:/WINDOWS/clock.avi'
        });
      });
    });

    describe('mailto:', function() {
      it('mailto:alex@site.com', function() {
        expect(new UriString('mailto:alex@site.com')).toEqual({
          scheme: 'mailto',
          path: 'alex@site.com'
        });
      });

      it('mailto:alex@site.com,bob@site.com', function() {
        expect(new UriString('mailto:alex@site.com,bob@site.com')).toEqual({
          scheme: 'mailto',
          path: 'alex@site.com,bob@site.com'
        });
      });

      it('mailto:alex@site.com?cc=bob@example.com&body=hello', function() {
        expect(new UriString('mailto:alex@site.com?cc=bob@example.com&body=hello')).toEqual({
          scheme: 'mailto',
          path: 'alex@site.com',
          query: 'cc=bob@example.com&body=hello'
        });
      });

      it('mailto:?cc=bob@example.com&body=hello', function() {
        expect(new UriString('mailto:?cc=bob@example.com&body=hello')).toEqual({
          scheme: 'mailto',
          query: 'cc=bob@example.com&body=hello'
        });
      });
    });

    describe('tel:', function() {
      it('tel:+380501234567', function() {
        expect(new UriString('tel:+380501234567')).toEqual({
          scheme: 'tel',
          path: '+380501234567'
        });
      });

      it('tel:+38(050)1234567', function() {
        expect(new UriString('tel:+38(050)1234567')).toEqual({
          scheme: 'tel',
          path: '+38(050)1234567'
        });
      });

      it('tel:+38(050)123-45-67', function() {
        expect(new UriString('tel:+38(050)123-45-67')).toEqual({
          scheme: 'tel',
          path: '+38(050)123-45-67'
        });
      });

      it('tel:+380501234567;phone-context=munich.example.com', function() {
        expect(new UriString('tel:+380501234567;phone-context=munich.example.com')).toEqual({
          scheme: 'tel',
          path: '+380501234567;phone-context=munich.example.com'
        });
      });
    });

    describe('data:', function() {
      it('data:,A%20brief%20note', function() {
        expect(new UriString('data:,A%20brief%20note')).toEqual({
          scheme: 'data',
          path: ',A%20brief%20note'
        });
      });

      it('data:text/plain;base64,aGVsbG8gd29ybGQ=', function() {
        expect(new UriString('data:text/plain;base64,aGVsbG8gd29ybGQ=')).toEqual({
          scheme: 'data',
          path: 'text/plain;base64,aGVsbG8gd29ybGQ='
        });
      });

      it('data:text/plain;charset=iso-8859-7,%be%fg%be', function() {
        expect(new UriString('data:text/plain;charset=iso-8859-7,%be%fg%be')).toEqual({
          scheme: 'data',
          path: 'text/plain;charset=iso-8859-7,%be%fg%be'
        });
      });
    });
  });
});
