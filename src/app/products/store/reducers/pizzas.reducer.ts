import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';
import { createReducer, on } from '@ngrx/store';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(fromPizzas.loadPizzas, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(fromPizzas.loadPizzasSuccess, (state, { pizzas }) => {
    const entities = pizzas.reduce(
      (entities: { [id: number]: Pizza }, pizza: Pizza) => {
        return {
          ...entities,
          [pizza.id]: pizza,
        };
      },
      {
        ...state.entities,
      }
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      entities,
    };
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
      const entities = {
        ...state.entities,
        [pizza.id]: pizza,
      };

      return {
        ...state,
        entities,
      };
    }
  ),
  on(fromPizzas.removePizzaSuccess, (state, { pizza }) => {
    const { [pizza.id]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities,
    };
  })
);

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
