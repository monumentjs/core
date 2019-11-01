import { PathString } from '../../src/component/PathString';

describe('PathString', function() {
  describe('constructor(string)', function() {
    it('[empty string]', function() {
      expect(new PathString('')).toMatchObject({
        segments: ['']
      });
    });

    it('/', function() {
      expect(new PathString('/')).toMatchObject({
        segments: ['']
      });
    });

    it('/path', function() {
      expect(new PathString('/path')).toMatchObject({
        segments: ['', 'path']
      });
    });

    it('/path/to/resource', function() {
      expect(new PathString('/path/to/resource')).toMatchObject({
        segments: ['', 'path', 'to', 'resource']
      });
    });

    it('.', function() {
      expect(new PathString('.')).toMatchObject({
        segments: ['.']
      });
    });

    it('./.', function() {
      expect(new PathString('./.')).toMatchObject({
        segments: ['.']
      });
    });

    it('./..', function() {
      expect(new PathString('./..')).toMatchObject({
        segments: ['..']
      });
    });

    it('..', function() {
      expect(new PathString('..')).toMatchObject({
        segments: ['..']
      });
    });

    it('../.', function() {
      expect(new PathString('../.')).toMatchObject({
        segments: ['..']
      });
    });

    it('../..', function() {
      expect(new PathString('../..')).toMatchObject({
        segments: ['..', '..']
      });
    });

    it('.././..', function() {
      expect(new PathString('.././..')).toMatchObject({
        segments: ['..', '..']
      });
    });

    it('relative/path', function() {
      expect(new PathString('relative/path')).toMatchObject({
        segments: ['relative', 'path']
      });
    });

    it('./relative/path', function() {
      expect(new PathString('./relative/path')).toMatchObject({
        segments: ['.', 'relative', 'path']
      });
    });

    it('../relative/path', function() {
      expect(new PathString('../relative/path')).toMatchObject({
        segments: ['..', 'relative', 'path']
      });
    });

    it('../relative/./path', function() {
      expect(new PathString('../relative/./path')).toMatchObject({
        segments: ['..', 'relative', 'path']
      });
    });

    it('../relative/../path', function() {
      expect(new PathString('../relative/../path')).toMatchObject({
        segments: ['..', 'path']
      });
    });

    it('../relative/../../path', function() {
      expect(new PathString('../relative/../../path')).toMatchObject({
        segments: ['..', '..', 'path']
      });
    });

    it('./relative/../..', function() {
      expect(new PathString('./relative/../..')).toMatchObject({
        segments: ['..']
      });
    });

    it('./../../relative', function() {
      expect(new PathString('./../../relative')).toMatchObject({
        segments: ['..', '..', 'relative']
      });
    });

    it('./.././../relative', function() {
      expect(new PathString('./.././../relative')).toMatchObject({
        segments: ['..', '..', 'relative']
      });
    });

    it('/D:/Documents/Presentation.pptx', function() {
      expect(new PathString('/D:/Documents/Presentation.pptx')).toMatchObject({
        segments: ['', 'D:', 'Documents', 'Presentation.pptx']
      });
    });

    it('/C:/Program%20Files', function() {
      expect(new PathString('/C:/Program%20Files')).toMatchObject({
        segments: ['', 'C:', 'Program Files']
      });
    });
  });

  describe('toString()', function() {
    it('[empty string]', function() {
      expect(new PathString('').toString()).toEqual('');
    });

    it('/', function() {
      expect(new PathString('/').toString()).toEqual('');
    });

    it('/absolute/path', function() {
      expect(new PathString('/absolute/path').toString()).toEqual('/absolute/path');
    });

    it('relative/path', function() {
      expect(new PathString('relative/path').toString()).toEqual('relative/path');
    });

    it('./relative/path', function() {
      expect(new PathString('./relative/path').toString()).toEqual('./relative/path');
    });

    it('./.././../relative', function() {
      expect(new PathString('./.././../relative').toString()).toEqual('../../relative');
    });

    it('/C:/Program%20Files', function() {
      expect(new PathString('/C:/Program%20Files').toString()).toEqual('/C:/Program%20Files');
    });
  });
});
