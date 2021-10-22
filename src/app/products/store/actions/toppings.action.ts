import { createAction, props } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

// load toppings
export const LoadToppings = createAction('[Products] Load Toppings');

export const LoadToppingsSuccess = createAction(
  '[Products] Load Toppings Success',
  props<{ toppings: Topping[] }>()
);

export const LoadToppingsFail = createAction(
  '[Products] Load Toppings Fail',
  props<{ error: any }>()
);

export const visualizeToppings = createAction(
  '[Products] visualize Toppings',
  props<{ toppings: number[] }>()
);
