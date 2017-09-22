import {IEnumerable} from '../../../../Collections/Abstraction/IEnumerable';


export interface INode {
    parentNode: INode | undefined;
    readonly childNodes: IEnumerable<INode>;
}
