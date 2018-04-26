

export type EventHandler<TTarget extends object, TArgs> = (target: TTarget, args: TArgs) => void;

