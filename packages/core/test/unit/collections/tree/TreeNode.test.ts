import { InvalidArgumentException, TreeNode } from '../../../..';

describe('TreeNode', function() {
  let html!: TreeNode;
  let head!: TreeNode;
  let body!: TreeNode;
  let main!: TreeNode;

  beforeEach(() => {
    html = new TreeNode();
    head = new TreeNode();
    body = new TreeNode();
    main = new TreeNode();

    html.addChild(head);
    html.addChild(body);
    body.addChild(main);
  });

  it('parent/child relation', function() {
    const parent: TreeNode = new TreeNode();
    const child: TreeNode = new TreeNode();

    expect(parent.parentNode).toBe(undefined);
    expect(parent.childNodes.length).toBe(0);
    expect(child.parentNode).toBe(undefined);
    expect(child.childNodes.length).toBe(0);
  });

  it('tree structure with child nodes', function() {
    expect(html.parentNode).toBe(undefined);
    expect(html.childNodes.length).toBe(2);
    expect(html.childNodes.getAt(0)).toBe(head);
    expect(html.childNodes.getAt(1)).toBe(body);
    expect(head.parentNode).toBe(html);
    expect(head.childNodes.length).toBe(0);
    expect(body.parentNode).toBe(html);
    expect(body.childNodes.length).toBe(1);
    expect(body.childNodes.getAt(0)).toBe(main);
    expect(main.parentNode).toBe(body);
    expect(main.childNodes.length).toBe(0);
  });

  describe('path', function() {
    it('should return path to root node', function() {
      const path = [...main.path];

      expect(path.length).toBe(3);
      expect(path).toEqual([main, body, html]);
    });
  });

  describe('addChild()', function() {
    it('should replace existing child with another one', function() {
      const newChild = new TreeNode();

      expect(body.childNodes.length).toBe(1);
      expect(body.childNodes.toArray()).toEqual([main]);
      expect(main.parentNode).toBe(body);

      expect(body.addChild(newChild)).toBe(true);

      expect(body.childNodes.length).toBe(2);
      expect(body.childNodes.toArray()).toEqual([main, newChild]);
      expect(newChild.parentNode).toBe(body);

      expect(body.addChild(main)).toBe(false);

      expect(body.childNodes.length).toBe(2);
      expect(body.childNodes.toArray()).toEqual([main, newChild]);
      expect(main.parentNode).toBe(body);
      expect(newChild.parentNode).toBe(body);
    });
  });

  describe('removeChild()', function() {
    it('should replace existing child with another one', function() {
      const newChild = new TreeNode();

      expect(body.childNodes.length).toBe(1);
      expect(body.childNodes.toArray()).toEqual([main]);
      expect(main.parentNode).toBe(body);

      expect(() => {
        body.removeChild(newChild);
      }).toThrow(InvalidArgumentException);

      expect(body.childNodes.length).toBe(1);
      expect(body.childNodes.toArray()).toEqual([main]);
      expect(main.parentNode).toBe(body);

      expect(body.removeChild(main)).toBe(true);

      expect(body.childNodes.length).toBe(0);
      expect(body.childNodes.toArray()).toEqual([]);
      expect(main.parentNode).toBeUndefined();

      expect(() => {
        body.removeChild(main);
      }).toThrow(InvalidArgumentException);

      expect(body.childNodes.length).toBe(0);
      expect(body.childNodes.toArray()).toEqual([]);
      expect(main.parentNode).toBeUndefined();
    });
  });

  describe('replaceChild()', function() {
    it('should replace existing child with another one', function() {
      const newChild = new TreeNode();

      expect(body.childNodes.length).toBe(1);
      expect(body.childNodes.toArray()).toEqual([main]);
      expect(main.parentNode).toBe(body);

      expect(() => {
        body.replaceChild(newChild, main);
      }).not.toThrow(InvalidArgumentException);

      expect(body.childNodes.length).toBe(1);
      expect(body.childNodes.toArray()).toEqual([newChild]);
      expect(main.parentNode).toBeUndefined();
      expect(newChild.parentNode).toBe(body);
    });
  });
});
