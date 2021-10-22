import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import { PizzasService } from '../../services';
import { Router } from '@angular/router';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: PizzasService,
    private router: Router
  ) {}

  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.loadPizzas),
      switchMap(() => {
        return this.pizzaService.getPizzas().pipe(
          map((pizzas) => pizzaActions.loadPizzasSuccess({ pizzas })),
          catchError((error) => of(pizzaActions.loadPizzasFail(error)))
        );
      })
    )
  );

  createPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.createPizza),
      mergeMap(({ pizza }) => {
        return this.pizzaService.createPizza(pizza).pipe(
          map((pizza) => pizzaActions.createPizzaSuccess({ pizza })),
          catchError((error) => of(pizzaActions.createPizzaFail(error)))
        );
      })
    )
  );

  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.updatePizza),
      mergeMap(({ pizza }) => {
        return this.pizzaService.updatePizza(pizza).pipe(
          map(() => pizzaActions.updatePizzaSuccess({ pizza })),
          catchError((error) => of(pizzaActions.updatePizzaFail(error)))
        );
      })
    )
  );

  removePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.removePizza),
      mergeMap(({ pizza }) => {
        return this.pizzaService.removePizza(pizza).pipe(
          map(() => pizzaActions.removePizzaSuccess({ pizza })),
          catchError((error) => of(pizzaActions.removePizzaSuccess(error)))
        );
      })
    )
  );

  handlePizzaSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          pizzaActions.updatePizzaSuccess,
          pizzaActions.removePizzaSuccess,
          pizzaActions.createPizzaSuccess
        ),
        map((pizza) => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );
}
