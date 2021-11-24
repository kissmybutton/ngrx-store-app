import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface PizzaState extends EntityState<Pizza> {
  // entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>({
  //this config is optional
  selectId: selectPizzaId,
  sortComparer: sortByName,
});

export function selectPizzaId(pizza: Pizza): number {
  //In this case this would be optional since primary key is id
  return pizza.id;
}

export function sortByName(pizzaA: Pizza, pizzaB: Pizza): number {
  return pizzaA.name.localeCompare(pizzaB.name);
}

export const initialState: PizzaState = adapter.getInitialState({
  // entities: {},
  loaded: false,
  loading: false,
});

export const reducer = createReducer(
  initialState,
  on(fromPizzas.loadPizzas, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(fromPizzas.loadPizzasSuccess, (state, { pizzas }) => {
    return adapter.upsertMany(pizzas, {
      ...state,
      loading: false,
      loaded: true,
    });
    // const entities = pizzas.reduce(
    //   (entities: { [id: number]: Pizza }, pizza: Pizza) => {
    //     return {
    //       ...entities,
    //       [pizza.id]: pizza,
    //     };
    //   },
    //   {
    //     ...state.entities,
    //   }
    // );

    // return {
    //   ...state,
    //   loading: false,
    //   loaded: true,
    //   entities,
    // };
  }),
  on(fromPizzas.loadPizzasFail, (state) => {
    return {
      ...state,
      loading: false,
      loaded: false,
    };
  }),
  on(
    fromPizzas.updatePizzaSuccess,
    fromPizzas.createPizzaSuccess,
    (state, { pizza }) => {
      return adapter.upsertOne(pizza, state);
      // const entities = {
      //   ...state.entities,
      //   [pizza.id]: pizza,
      // };

      // return {
      //   ...state,
      //   entities,
      // };
    }
  ),
  on(fromPizzas.removePizzaSuccess, (state, { pizza }) => {
    return adapter.removeOne(pizza.id, state);
    // const { [pizza.id]: removed, ...entities } = state.entities;

    // return {
    //   ...state,
    //   entities,
    // };
  })
);

//get state selectors from adapter
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

// export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
