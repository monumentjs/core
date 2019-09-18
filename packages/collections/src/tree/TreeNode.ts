import { InvalidArgumentException } from '@monument/exceptions';
import { ReadOnlyList } from '@monument/contracts';
import { ArrayList } from '../list/mutable/ArrayList';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 * @mutable
 */
export class TreeNode<T = any> {
  private readonly _childNodes: ArrayList<TreeNode<T>> = new ArrayList();
  private _parentNode: TreeNode<T> | undefined;

  data: T | undefined;

  get childNodes(): ReadOnlyList<TreeNode<T>> {
    return this._childNodes;
  }

  get childNodesCount(): number {
    return this._childNodes.length;
  }

  get depth(): number {
    let depth = 0;
    let parentNode: TreeNode<T> | undefined = this.parentNode;

    while (parentNode != null) {
      depth += 1;
      parentNode = parentNode.parentNode;
    }

    return depth;
  }

  get firstChild(): TreeNode<T> | undefined {
    if (this.hasChildNodes) {
      return this.childNodes.getAt(0);
    } else {
      return undefined;
    }
  }

  get hasChildNodes(): boolean {
    return this.childNodes.isEmpty === false;
  }

  get isDetached(): boolean {
    return this._parentNode == null;
  }

  get lastChild(): TreeNode<T> | undefined {
    if (this.hasChildNodes) {
      return this.childNodes.getAt(this.childNodes.lastIndex);
    } else {
      return undefined;
    }
  }

  get nextSibling(): TreeNode<T> | undefined {
    let indexOfCurrentNode: number;

    if (!this.parentNode) {
      return undefined;
    }

    indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

    return this.parentNode.childNodes.getAt(indexOfCurrentNode + 1);
  }

  get parentNode(): TreeNode<T> | undefined {
    return this._parentNode;
  }

  get path(): Iterable<TreeNode<T>> {
    return this.getPath();
  }

  get previousSibling(): TreeNode<T> | undefined {
    let indexOfCurrentNode: number;

    if (!this.parentNode) {
      return undefined;
    }

    indexOfCurrentNode = this.parentNode.childNodes.indexOf(this);

    return this.parentNode.childNodes.getAt(indexOfCurrentNode - 1);
  }

  constructor(data?: T) {
    this.data = data;
  }

  addChild(node: TreeNode<T>): boolean {
    if (this.hasChild(node)) {
      return false;
    }

    node.detach();
    node._parentNode = this;

    return this._childNodes.add(node);
  }

  addChildren(nodes: Iterable<TreeNode<T>>): boolean {
    let modified = false;

    for (const node of nodes) {
      if (this.addChild(node)) {
        modified = true;
      }
    }

    return modified;
  }

  detach(): void {
    if (this._parentNode) {
      this._parentNode._childNodes.remove(this);
      this._parentNode = undefined;
    }
  }

  hasChild(node: TreeNode<T>): boolean {
    return this._childNodes.contains(node);
  }

  insertAfter(newNode: TreeNode<T>, refNode: TreeNode<T>): void {
    const insertPosition: number = this.childNodes.indexOf(refNode);

    if (insertPosition < -1) {
      throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
    }

    newNode.detach();
    newNode._parentNode = this;

    this._childNodes.insert(insertPosition + 1, newNode);
  }

  insertBefore(newNode: TreeNode<T>, refNode: TreeNode<T>): void {
    const insertPosition: number = this.childNodes.indexOf(refNode);

    if (insertPosition < -1) {
      throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
    }

    newNode.detach();
    newNode._parentNode = this;

    this._childNodes.insert(insertPosition, newNode);
  }

  removeChild(node: TreeNode<T>): boolean {
    if (!this.hasChild(node)) {
      throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
    }

    node.detach();

    return true;
  }

  removeChildren(nodes: Iterable<TreeNode<T>>): boolean {
    let modified = false;

    for (const node of nodes) {
      if (this.removeChild(node)) {
        modified = true;
      }
    }

    return modified;
  }

  replaceChild(newNode: TreeNode<T>, refNode: TreeNode<T>): void {
    const indexOfOldNode: number = this.childNodes.indexOf(refNode);

    if (indexOfOldNode < -1) {
      throw new InvalidArgumentException('Reference node is not a member of child nodes collection.');
    }

    this.insertAfter(newNode, refNode);

    refNode.detach();
  }

  private *getPath(): Iterable<TreeNode<T>> {
    let node: TreeNode<T> | undefined = this;

    while (node) {
      yield node;

      node = node.parentNode;
    }
  }
}
