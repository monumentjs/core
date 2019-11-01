import { AuthorityObject } from '../../src/component/AuthorityObject';

describe('Authority', function() {
  describe('parse(string)', function() {
    it('alex:secret@site.com:4200', function() {
      expect(AuthorityObject.parse('alex:secret@site.com:4200')).toMatchObject({
        userName: {
          value: 'alex',
          present: true
        },
        password: {
          value: 'secret',
          present: true
        },
        host: {
          value: 'site.com',
          present: true
        },
        port: {
          value: 4200,
          present: true
        },
        value: 'alex:secret@site.com:4200',
        present: true
      });
    });

    it('alex@site.com:4200', function() {
      expect(AuthorityObject.parse('alex@site.com:4200')).toMatchObject({
        host: {
          value: 'site.com',
          present: true
        },
        port: {
          value: 4200,
          present: true
        },
        userName: {
          value: 'alex',
          present: true
        },
        password: {
          present: false
        },
        value: 'alex@site.com:4200',
        present: true
      });
    });

    it('alex:secret@site.com', function() {
      expect(AuthorityObject.parse('alex:secret@site.com')).toMatchObject({
        host: {
          value: 'site.com',
          present: true
        },
        port: {
          present: false
        },
        userName: {
          value: 'alex',
          present: true
        },
        password: {
          value: 'secret',
          present: true
        },
        value: 'alex:secret@site.com',
        present: true
      });
    });

    it('alex@site.com', function() {
      expect(AuthorityObject.parse('alex@site.com')).toMatchObject({
        host: {
          value: 'site.com',
          present: true
        },
        port: {
          present: false
        },
        userName: {
          value: 'alex',
          present: true
        },
        password: {
          present: false
        },
        value: 'alex@site.com',
        present: true
      });
    });

    it('site.com:4200', function() {
      expect(AuthorityObject.parse('site.com:4200')).toMatchObject({
        host: {
          value: 'site.com',
          present: true
        },
        port: {
          value: 4200,
          present: true
        },
        userName: {
          present: false
        },
        password: {
          present: false
        },
        value: 'site.com:4200',
        present: true
      });
    });

    it('site.com', function() {
      expect(AuthorityObject.parse('site.com')).toMatchObject({
        host: {
          value: 'site.com',
          present: true
        },
        port: {
          present: false
        },
        userName: {
          present: false
        },
        password: {
          present: false
        },
        value: 'site.com',
        present: true
      });
    });

    it('127.0.0.1:8080', function() {
      expect(AuthorityObject.parse('127.0.0.1:8080')).toMatchObject({
        host: {
          value: '127.0.0.1',
          present: true
        },
        port: {
          value: 8080,
          present: true
        },
        userName: {
          present: false
        },
        password: {
          present: false
        },
        value: '127.0.0.1:8080',
        present: true
      });
    });

    it('127.0.0.1', function() {
      expect(AuthorityObject.parse('127.0.0.1')).toMatchObject({
        host: {
          value: '127.0.0.1',
          present: true
        },
        port: {
          present: false
        },
        userName: {
          present: false
        },
        password: {
          present: false
        },
        value: '127.0.0.1',
        present: true
      });
    });

    it('[empty string]', function() {
      expect(AuthorityObject.parse('')).toMatchObject({
        host: {
          present: false
        },
        port: {
          present: false
        },
        userName: {
          present: false
        },
        password: {
          present: false
        },
        present: false
      });
    });
  });
});
