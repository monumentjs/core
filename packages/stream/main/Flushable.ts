

export interface Flushable {
    flush(): Promise<void> | void;
}
