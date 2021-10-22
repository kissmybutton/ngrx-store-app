import { createAction, props } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// load pizzas
export const loadPizzas = createAction('[Products] Load Pizzas');

export const loadPizzasSuccess = createAction(
  '[Products] Load Pizzas Success',
  props<{ pizzas: Pizza[] }>()
);

export const loadPizzasFail = createAction(
  '[Products] Load Pizzas Fail',
  props<{ error: any }>()
);

// create pizza
export const createPizza = createAction(
  '[Products] Create Pizza',
  props<{ pizza: Pizza }>()
);

export const createPizzaSuccess = createAction(
  '[Products] Create Pizza Success',
  props<{ pizza: Pizza }>()
);

export const createPizzaFail = createAction(
  '[Products] Create Pizza Fail',
  props<{ error: any }>()
);

// update pizza
export const updatePizza = createAction(
  '[Products] Update Pizza',
  props<{ pizza: Pizza }>()
);

export const updatePizzaSuccess = createAction(
  '[Products] Update Pizza Success',
  props<{ pizza: Pizza }>()
);

export const updatePizzaFail = createAction(
  '[Products] Update Pizza Fail',
  props<{ error: any }>()
);

// remove pizza
export const removePizza = createAction(
  '[Products] Remove Pizza',
  props<{ pizza: Pizza }>()
);

export const removePizzaSuccess = createAction(
  '[Products] Remove Pizza Success',
  props<{ pizza: Pizza }>()
);

export const removePizzaFail = createAction(
  '[Products] Remove Pizza Fail',
  props<{ error: any }>()
);
