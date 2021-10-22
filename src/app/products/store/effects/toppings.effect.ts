import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import * as toppingsActions from '../actions/toppings.action';
import { ToppingsService } from '../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: ToppingsService
  ) {}

  loadToppings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toppingsActions.LoadToppings),
      switchMap(() => {
        return this.toppingsService.getToppings().pipe(
          map((toppings) => toppingsActions.LoadToppingsSuccess({ toppings })),
          catchError((error) => of(toppingsActions.LoadToppingsFail(error)))
        );
      })
    )
  );
}
