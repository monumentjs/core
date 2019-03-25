import { TreeNode } from '../../../..';

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

    describe('path', function() {
        it('should return path to root node', function() {
            const path = [...main.path];

            expect(path.length).toBe(3);
            expect(path).toEqual([main, body, html]);
        });
    });
});
