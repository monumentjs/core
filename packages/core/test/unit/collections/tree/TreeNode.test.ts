import { TreeNode } from '../../../..';

describe('TreeNode', function() {
    let html!: TreeNode<string>;
    let head!: TreeNode<string>;
    let body!: TreeNode<string>;
    let main!: TreeNode<string>;

    beforeEach(() => {
        html = new TreeNode('html');
        head = new TreeNode('head');
        body = new TreeNode('body');
        main = new TreeNode('main');

        html.addChild(head);
        html.addChild(body);
        body.addChild(main);
    });

    it('parent/child relation', function() {
        const parent: TreeNode<string> = new TreeNode('parent');
        const child: TreeNode<string> = new TreeNode('child');

        expect(parent.parentNode).toBe(undefined);
        expect(parent.childNodes.length).toBe(0);
        expect(child.parentNode).toBe(undefined);
        expect(child.childNodes.length).toBe(0);

        child.parentNode = parent;

        expect(parent.parentNode).toBe(undefined);
        expect(parent.childNodes.length).toBe(1);
        expect(parent.childNodes.getAt(0)).toBe(child);
        expect(child.parentNode).toBe(parent);
        expect(child.childNodes.length).toBe(0);

        child.parentNode = undefined;

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
});
