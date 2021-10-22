import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';

import { ToppingsService } from '../../services/toppings.service';
import * as fromEffects from './toppings.effect';
import * as fromActions from '../actions/toppings.action';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

describe('ToppingsEffects', () => {
  let actions$ = new Observable<Action>();
  let service: ToppingsService;
  let effects: fromEffects.ToppingsEffects;

  const toppings = [
    { id: 1, name: 'onion' },
    { id: 2, name: 'mushroom' },
    { id: 3, name: 'basil' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToppingsService,
        fromEffects.ToppingsEffects,
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(ToppingsService);
    effects = TestBed.inject(fromEffects.ToppingsEffects);

    spyOn(service, 'getToppings').and.returnValue(of(toppings));
  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const action = fromActions.LoadToppings();
      const completion = fromActions.LoadToppingsSuccess({ toppings });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });
});
