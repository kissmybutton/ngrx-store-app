import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selectors';

import { Pizza } from '../../models/pizza.model';

export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

// export const getPizzasEntities = createSelector(
//   getPizzaState,
//   fromPizzas.getPizzasEntities
// );
export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.selectEntities
);

export const getSelectedPizza = (props: { pizzaId: string }) =>
  createSelector(getPizzasEntities, (entities): Pizza => {
    return entities[props.pizzaId];
  });

export const getPizzaVisualized = (props: { pizzaId: string }) =>
  createSelector(
    getSelectedPizza({ pizzaId: props.pizzaId }),
    fromToppings.getToppingEntities,
    fromToppings.getSelectedToppings,
    (pizza, toppingEntities, selectedToppings) => {
      const toppings = selectedToppings.map((id) => toppingEntities[id]);
      return { ...pizza, toppings };
    }
  );

// export const getAllPizzas = createSelector(getPizzasEntities, (entities) => {
//   return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
// });
export const getAllPizzas = createSelector(getPizzaState, fromPizzas.selectAll);

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
