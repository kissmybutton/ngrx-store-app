import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ToppingsState extends EntityState<Topping> {
  // entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const adapter: EntityAdapter<Topping> = createEntityAdapter<Topping>({});

export const initialState: ToppingsState = adapter.getInitialState({
  // entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
});

export const reducer = createReducer(
  initialState,
  on(fromToppings.visualizeToppings, (state, { toppings }) => {
    return {
      ...state,
      selectedToppings: toppings,
    };
  }),
  on(fromToppings.LoadToppings, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(fromToppings.LoadToppingsSuccess, (state, { toppings }) => {
    return adapter.upsertMany(toppings, {
      ...state,
      loaded: true,
      loading: false,
    });
    // const entities = toppings.reduce(
    //   (entities: { [id: number]: Topping }, topping: Topping) => {
    //     return {
    //       ...entities,
    //       [topping.id]: topping,
    //     };
    //   },
    //   {
    //     ...state.entities,
    //   }
    // );

    // return {
    //   ...state,
    //   loaded: true,
    //   loading: false,
    //   entities,
    // };
  }),
  on(fromToppings.LoadToppingsFail, (state) => {
    return {
      ...state,
      loaded: false,
      loading: false,
    };
  })
);

//get state selectors from adapter
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) =>
  state.selectedToppings;
