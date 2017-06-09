import {Queue} from '../../Core/Collections/Queue';
import {assertArgumentBounds, assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {IDisposable} from '../../Core/types';


export abstract class StreamBuffer<TChunk> implements IDisposable {
    private _isDisposed: boolean = false;
    private _chunksQueue: Queue<TChunk> = new Queue<TChunk>();
    private _capacity: number;


    public get capacity(): number {
        return this._capacity;
    }


    public get isEmpty(): boolean {
        return this.getBufferSize() === 0;
    }


    public get isFull(): boolean {
        return this.getBufferSize() >= this.capacity;
    }


    public get isDisposed(): boolean {
        return this._isDisposed;
    }


    public constructor(capacity: number) {
        assertArgumentNotNull('capacity', capacity);
        assertArgumentBounds('capacity', capacity, 1, Infinity);

        this._capacity = capacity;
    }


    public enqueue(chunk: TChunk): void {
        assertArgumentNotNull('chunk', chunk);

        this._chunksQueue.enqueue(chunk);
    }


    public dequeue(): TChunk {
        return this._chunksQueue.dequeue();
    }


    public clear(): void {
        this._chunksQueue.clear();
    }


    public dispose(): void {
        this.clear();

        this._isDisposed = true;
    }


    protected abstract getBufferSize(): number;
}
