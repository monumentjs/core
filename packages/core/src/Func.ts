/**
 * @param T type of supplied value
 * @author Alex Chugaev
 * @since 0.0.1
 */
export type Func<R> = () => R;
export type Func1<A, R> = (a: A) => R;
export type Func2<A, B, R> = (a: A, b: B) => R;
export type Func3<A, B, C, R> = (a: A, b: B, c: C) => R;
export type Func4<A, B, C, D, R> = (a: A, b: B, c: C, d: D) => R;
export type Func5<A, B, C, D, E, R> = (a: A, b: B, c: C, d: D, e: E) => R;
export type Func6<A, B, C, D, E, F, R> = (a: A, b: B, c: C, d: D, e: E, f: F) => R;
export type Func7<A, B, C, D, E, F, G, R> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R;
export type Func8<A, B, C, D, E, F, G, H, R> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R;
export type Func9<A, B, C, D, E, F, G, H, I, R> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => R;
export type Func10<A, B, C, D, E, F, G, H, I, J, R> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => R;
