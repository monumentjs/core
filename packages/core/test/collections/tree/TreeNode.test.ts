import {Key, TreeNode} from '../../..';

describe('TreeNode', function () {
    const VALUE: Key<string> = new Key('Node value');
    let html!: TreeNode;
    let head!: TreeNode;
    let body!: TreeNode;
    let main!: TreeNode;

    beforeEach(() => {
        html = new TreeNode();
        head = new TreeNode();
        body = new TreeNode();
        main = new TreeNode();

        html.setAttribute(VALUE, 'html');
        head.setAttribute(VALUE, 'head');
        body.setAttribute(VALUE, 'body');
        main.setAttribute(VALUE, 'main');

        html.addChild(head);
        html.addChild(body);
        body.addChild(main);
    });

    it('parent/child relation', function () {
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

    it('tree structure with child nodes', function () {
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

    // TODO: implement tree iterators
    // it('iteration over the tree children', function () {
    //     const mock = jest.fn();
    //
    //     for (const node of html.childNodes) {
    //         mock(node.getAttribute(VALUE));
    //     }
    //
    //     expect(mock).toHaveBeenCalledTimes(3);
    //     expect(mock).toHaveBeenNthCalledWith(1, ['head']);
    //     expect(mock).toHaveBeenNthCalledWith(2, ['body']);
    //     expect(mock).toHaveBeenNthCalledWith(3, ['main']);
    // });
});
