import { EqualsFunction } from './EqualsFunction';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export const referenceEquals: EqualsFunction<any> = (x: any, y: any): boolean => {
  return x === y;
};
