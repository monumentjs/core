import {TreeNode} from './TreeNode';
import {Sequence} from '../base/Sequence';
import {ArrayList} from '../list/mutable/ArrayList';
import {ListChangedEventArgs} from '../list/observable/ListChangedEventArgs';
import {ListChangeKind} from '../list/observable/ListChangeKind';
import {InvalidArgumentException} from '../../exceptions/InvalidArgumentException';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class TreeNodeList extends ArrayList<TreeNode> {
    private readonly _parentNode: TreeNode;

    public get parentNode(): TreeNode {
        return this._parentNode;
    }

    public constructor(parentNode: TreeNode, nodes?: Sequence<TreeNode>) {
        super();

        this._parentNode = parentNode;

        if (nodes != null) {
            this.doAddAll(nodes);
        }

        this.changed.subscribe((args: ListChangedEventArgs<TreeNode>) => {
            for (const change of args.changes) {
                switch (change.type) {
                    case ListChangeKind.ITEM_ADDED:
                        change.item.parentNode = this.parentNode;
                        break;

                    case ListChangeKind.ITEM_REMOVED:
                        change.item.parentNode = undefined;
                        break;

                    case ListChangeKind.ITEM_REPLACED:
                        change.oldValue.parentNode = undefined;
                        change.newValue.parentNode = this.parentNode;
                        break;

                    default:
                        throw new InvalidArgumentException('Unknown list change kind');
                }
            }
        });
    }
}
