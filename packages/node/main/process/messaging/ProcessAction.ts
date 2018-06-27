

export interface ProcessAction<TActionType extends string> {
    readonly actionType: TActionType;
}
