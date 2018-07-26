import {Assert} from '../../assert/Assert';
import {TreeNode} from './TreeNode';
import {Sequence} from '../readonly/Sequence';
import {ArrayList} from '../mutable/ArrayList';
import {List} from '../mutable/List';
import {IteratorFunction} from '../IteratorFunction';
import {EqualityComparator} from '../../EqualityComparator';
import {Grouping} from '../Grouping';


export class TreeNodeList<TNodeValue> implements List<TreeNode<TNodeValue>> {
    private readonly _parentNode: TreeNode<TNodeValue>;
    private readonly _nodes: List<TreeNode<TNodeValue>> = new ArrayList();

    public get isEmpty(): boolean {
        return this._nodes.isEmpty;
    }

    public get length(): number {
        return this._nodes.length;
    }

    public get parentNode(): TreeNode<TNodeValue> {
        return this._parentNode;
    }

    public constructor(parentNode: TreeNode<TNodeValue>, nodes?: Sequence<TreeNode<TNodeValue>>) {
        this._parentNode = parentNode;

        if (nodes != null) {
            this.addAll(nodes);
        }
    }

    public [Symbol.iterator](): Iterator<TreeNode<TNodeValue>> {
        return this._nodes[Symbol.iterator]();
    }

    public add(node: TreeNode<TNodeValue>): boolean {
        node.parentNode = this.parentNode;

        return this._nodes.add(node);
    }

    public addAll(nodes: Sequence<TreeNode<TNodeValue>>): boolean {
        for (const node of nodes) {
            node.parentNode = this.parentNode;
        }

        return this._nodes.addAll(nodes);
    }

    public aggregate<TAggregate>(iterator: (lastSeed: TAggregate, item: TreeNode<TNodeValue>, index: number) => TAggregate, initialSeed: TAggregate): TAggregate {
        return this._nodes.aggregate(iterator, initialSeed);
    }

    public all(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>): boolean {
        return this._nodes.all(predicate);
    }

    public any(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>): boolean {
        return this._nodes.any(predicate);
    }

    public average(selector: IteratorFunction<TreeNode<TNodeValue>, number>): number {
        return this._nodes.average(selector);
    }

    public clear(): boolean {
        for (const node of this) {
            node.parentNode = undefined;
        }

        return this._nodes.clear();
    }

    public concat(otherList: Sequence<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>> {
        return this._nodes.concat(otherList);
    }

    public contains(item: TreeNode<TNodeValue>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): boolean {
        return this._nodes.contains(item, comparator);
    }

    public containsAll(items: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): boolean {
        return this._nodes.containsAll(items, comparator);
    }

    public count(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>): number {
        return this._nodes.count(predicate);
    }

    public distinct(): List<TreeNode<TNodeValue>>;
    public distinct(comparator: EqualityComparator<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>>;
    public distinct(comparator?: EqualityComparator<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>> {
        if (comparator == null) {
            return this._nodes.distinct();
        }

        return this._nodes.distinct(comparator);
    }

    public except(otherList: Sequence<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>>;
    public except(otherList: Sequence<TreeNode<TNodeValue>>, comparator: EqualityComparator<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>>;
    public except(otherList: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>> {
        return this._nodes.except(otherList, comparator);
    }

    public findAll(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>): List<TreeNode<TNodeValue>> {
        return this._nodes.findAll(predicate);
    }

    public first(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>): TreeNode<TNodeValue> | undefined;
    public first(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>, defaultValue: TreeNode<TNodeValue>): TreeNode<TNodeValue>;
    public first(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>, defaultValue?: TreeNode<TNodeValue>): TreeNode<TNodeValue> | undefined {
        if (defaultValue == null) {
            return this._nodes.first(predicate);
        }

        return this._nodes.first(predicate, defaultValue);
    }

    public firstOrDefault(defaultValue: TreeNode<TNodeValue>): TreeNode<TNodeValue> {
        return this._nodes.firstOrDefault(defaultValue);
    }

    public forEach(iterator: IteratorFunction<TreeNode<TNodeValue>, boolean | void>, startIndex?: number, count?: number): void {
        this._nodes.forEach(iterator, startIndex, count);
    }

    public forEachReversed(iterator: IteratorFunction<TreeNode<TNodeValue>, boolean | void>, startIndex?: number, count?: number): void {
        this._nodes.forEachReversed(iterator, startIndex, count);
    }

    public getAt(index: number): TreeNode<TNodeValue> {
        return this._nodes.getAt(index);
    }

    public groupBy<TKey>(keySelector: IteratorFunction<TreeNode<TNodeValue>, TKey>): List<Grouping<TKey, TreeNode<TNodeValue>>>;
    public groupBy<TKey>(keySelector: IteratorFunction<TreeNode<TNodeValue>, TKey>, keyComparator: EqualityComparator<TKey>): List<Grouping<TKey, TreeNode<TNodeValue>>>;
    public groupBy<TKey>(keySelector: IteratorFunction<TreeNode<TNodeValue>, TKey>, keyComparator?: EqualityComparator<TKey>): List<Grouping<TKey, TreeNode<TNodeValue>>> {
        if (keyComparator == null) {
            return this._nodes.groupBy(keySelector);
        }

        return this._nodes.groupBy(keySelector, keyComparator);
    }

    public indexOf(item: TreeNode<TNodeValue>): number;
    public indexOf(item: TreeNode<TNodeValue>, comparator: EqualityComparator<TreeNode<TNodeValue>>): number;
    public indexOf(item: TreeNode<TNodeValue>, startIndex: number): number;
    public indexOf(item: TreeNode<TNodeValue>, startIndex: number, comparator: EqualityComparator<TreeNode<TNodeValue>>): number;
    public indexOf(item: TreeNode<TNodeValue>, startIndex: number, count: number): number;
    public indexOf(item: TreeNode<TNodeValue>, startIndex: number, count: number, comparator: EqualityComparator<TreeNode<TNodeValue>>): number;
    public indexOf(
        item: TreeNode<TNodeValue>,
        startIndex?: number | EqualityComparator<TreeNode<TNodeValue>>,
        count?: number | EqualityComparator<TreeNode<TNodeValue>>,
        comparator?: EqualityComparator<TreeNode<TNodeValue>>
    ): number {
        if (startIndex != null) {
            return this._nodes.indexOf(item, startIndex);
        }

        return this._nodes.indexOf(item);
    }

    public insert(position: number, node: TreeNode<TNodeValue>): boolean {
        node
        return this._nodes.insert(position, node);
    }

    public insertAll(index: number, items: Sequence<TreeNode<TNodeValue>>): boolean {
        return false;
    }

    public intersect(otherList: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>>;

    public intersect(otherList: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): ReadOnlyList<TreeNode<TNodeValue>>;

    public intersect(otherList: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): any {
    }

    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<TreeNode<TNodeValue>, TKey>, resultSelector: CombineFunction<TreeNode<TNodeValue>, TOuter, TResult>, keyComparator?: EqualityComparator<TKey>): List<TResult>;

    public join<TOuter, TKey, TResult>(outerList: Sequence<TOuter>, outerKeySelector: IteratorFunction<TOuter, TKey>, innerKeySelector: IteratorFunction<TreeNode<TNodeValue>, TKey>, resultSelector: CombineFunction<TreeNode<TNodeValue>, TOuter, TResult>, keyComparator?: EqualityComparator<TKey>): ReadOnlyList<TResult>;

    public join(outerList, outerKeySelector, innerKeySelector, resultSelector, keyComparator?): any {
    }

    public last(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>, defaultValue?: TreeNode<TNodeValue>): TreeNode<TNodeValue> | undefined {
        return undefined;
    }

    public lastIndexOf(item: TreeNode<TNodeValue>, startIndex?: number, count?: number, comparator?: EqualityComparator<TreeNode<TNodeValue>>): number {
        return ZERO;
    }

    public lastOrDefault(defaultValue: TreeNode<TNodeValue>): TreeNode<TNodeValue> {
        return undefined;
    }

    public map<TResult>(selector: IteratorFunction<TreeNode<TNodeValue>, TResult>): List<TResult>;

    public map<TResult>(selector: IteratorFunction<TreeNode<TNodeValue>, TResult>): ReadOnlyList<TResult>;

    public map(selector): any {
    }

    public max(selector: (item: TreeNode<TNodeValue>) => number): number {
        return ZERO;
    }

    public min(selector: (item: TreeNode<TNodeValue>) => number): number {
        return ZERO;
    }

    public orderBy<TKey>(keySelector: (actualItem: TreeNode<TNodeValue>) => TKey, comparator: Comparator<TKey>, sortOrder: SortOrder): List<TreeNode<TNodeValue>>;

    public orderBy<TKey>(keySelector: (actualItem: TreeNode<TNodeValue>) => TKey, comparator: Comparator<TKey>, sortOrder: SortOrder): ReadOnlyList<TreeNode<TNodeValue>>;

    public orderBy(keySelector, comparator, sortOrder: SortOrder): any {
    }

    public remove(node: TreeNode<TNodeValue>): boolean {
        const isRemoved: boolean = super.remove(node);

        if (isRemoved) {
            node.parentNode = undefined;
        }

        return isRemoved;
    }

    public removeAll(items: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): boolean {
        return false;
    }

    public removeAt(index: number): TreeNode<TNodeValue> {
        return undefined;
    }

    public removeBy(predicate: IteratorFunction<TreeNode<TNodeValue>, boolean>): boolean {
        return false;
    }

    public retainAll(items: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): boolean {
        return false;
    }

    public reverse(): List<TreeNode<TNodeValue>> {

    }

    public setAt(index: number, newValue: TreeNode<TNodeValue>): TreeNode<TNodeValue> {
        return undefined;
    }

    public skip(offset: number): List<TreeNode<TNodeValue>> {
    }

    public skipWhile(condition: IteratorFunction<TreeNode<TNodeValue>, boolean>): List<TreeNode<TNodeValue>>;

    public skipWhile(condition: IteratorFunction<TreeNode<TNodeValue>, boolean>): ReadOnlyList<TreeNode<TNodeValue>>;

    public skipWhile(condition: IteratorFunction<TreeNode<TNodeValue>, boolean>): any {
    }

    public slice(offset: number, length: number): List<TreeNode<TNodeValue>>;

    public slice(offset: number, length: number): ReadOnlyList<TreeNode<TNodeValue>>;

    public slice(offset: number, length: number): any {
    }

    public take(length: number): List<TreeNode<TNodeValue>>;

    public take(length: number): ReadOnlyList<TreeNode<TNodeValue>>;

    public take(length: number): any {
    }

    public takeWhile(condition: IteratorFunction<TreeNode<TNodeValue>, boolean>): List<TreeNode<TNodeValue>>;

    public takeWhile(condition: IteratorFunction<TreeNode<TNodeValue>, boolean>): ReadOnlyList<TreeNode<TNodeValue>>;

    public takeWhile(condition: IteratorFunction<TreeNode<TNodeValue>, boolean>): any {
    }

    public toArray(): TreeNode<TNodeValue>[] {
        return undefined;
    }

    public union(otherList: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): List<TreeNode<TNodeValue>>;

    public union(otherList: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): ReadOnlyList<TreeNode<TNodeValue>>;

    public union(otherList: Sequence<TreeNode<TNodeValue>>, comparator?: EqualityComparator<TreeNode<TNodeValue>>): any {
    }

    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<TreeNode<TNodeValue>, TOther, TResult>): List<TResult>;
    public zip<TOther, TResult>(otherList: Sequence<TOther>, resultSelector: CombineFunction<TreeNode<TNodeValue>, TOther, TResult>): ReadOnlyList<TResult>;
    public zip(otherList, resultSelector): any {
    }
}
