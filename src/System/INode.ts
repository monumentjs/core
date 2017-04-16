import {ICollection} from '../Core/Collections/ICollection';
import {IDictionary} from '../Core/Collections/IDictionary';


export interface INode {
    readonly attributes: IDictionary<string, string>;
    parentNode: INode;
    readonly childNodes: ICollection<INode>;
    readonly hasChildNodes: boolean;
}
