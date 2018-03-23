import {ActionDispatcher} from '../action/ActionDispatcher';
import {Container} from '../container/Container';


export interface Component extends ActionDispatcher {
    /**
     * Returns `true` if component is attached to a container.
     * Returns `false` if component is not attached to a container.
     */
    readonly isAttached: boolean;
    /**
     * Attaches component to container.
     * Returns `true` if component was attached to a new container.
     * Returns `false` if component already attached to given container.
     */
    attach(container: Container): boolean;
    /**
     * Detaches component from container if it was attached.
     */
    detach(): boolean;
}
