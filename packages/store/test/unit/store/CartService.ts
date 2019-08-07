import { Observable, of, throwError } from 'rxjs';
import { CartException } from './CartException';

export interface Product {
  readonly name: string;
  readonly description: string;
  readonly price: number;
}

export interface PageRequest {
  page: number;
}

export class CartService {
  getProducts(request: PageRequest): Observable<Product[]> {
    if (request.page >= 0) {
      return of([
        {
          name: 'name1',
          description: 'description1',
          price: 1
        },
        {
          name: 'name2',
          description: 'description2',
          price: 2
        }
      ]);
    } else {
      return throwError(new CartException('Invalid page number'));
    }
  }
}
