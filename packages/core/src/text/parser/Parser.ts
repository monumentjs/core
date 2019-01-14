/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export interface Parser<O> {
    canParse(source: string): boolean;

    parse(source: string): O;
}
