/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class EventArgs<TTarget extends object = object> {
    public readonly target: TTarget;

    public constructor(target: TTarget) {
        this.target = target;
    }
}
