import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer,
};

export const getProductsState =
  createFeatureSelector<ProductsState>('products');

// State Example
// {
//   auth: {},
//   another-feature: {},
//   products: {
//     pizzas: { entities: {}, loaded: false, loading: false}
//     toppings: { entities: {}, loaded: false, loading: false}
//   }
// }
