

export interface InitializingUnit {
    [InitializingUnit.afterPropertiesSet](): Promise<void> | void;
}

export namespace InitializingUnit {
    export const afterPropertiesSet = Symbol();
}
