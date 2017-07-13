import { IEnumerable } from '../../../Collections/IEnumerable';
export interface INode {
    parentNode: INode;
    readonly childNodes: IEnumerable<INode>;
}
