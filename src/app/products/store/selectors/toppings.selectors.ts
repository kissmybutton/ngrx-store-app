import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.toppings
);

// export const getToppingEntities = createSelector(
//   getToppingsState,
//   fromToppings.getToppingEntities
// );
export const getToppingEntities = createSelector(
  getToppingsState,
  fromToppings.selectEntities
);

export const getSelectedToppings = createSelector(
  getToppingsState,
  fromToppings.getSelectedToppings
);

// export const getAllToppings = createSelector(getToppingEntities, (entities) => {
//   return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
// });
export const getAllToppings = createSelector(
  getToppingsState,
  fromToppings.selectAll
);

export const getToppingsLoaded = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  getToppingsState,
  fromToppings.getToppingsLoading
);
