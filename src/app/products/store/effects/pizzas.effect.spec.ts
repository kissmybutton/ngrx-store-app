import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of } from 'rxjs';

import { PizzasService } from '../../services/pizzas.service';
import * as fromEffects from './pizzas.effect';
import * as fromActions from '../actions/pizzas.action';
import { cold, hot } from 'jasmine-marbles';
import { RouterTestingModule } from '@angular/router/testing';

describe('PizzasEffects', () => {
  let actions$ = new Observable<Action>();
  let service: PizzasService;
  let effects: fromEffects.PizzasEffects;

  const pizzas = [
    {
      id: 1,
      name: 'Pizza #1',
      toppings: [
        { id: 1, name: 'onion' },
        { id: 2, name: 'mushroom' },
        { id: 3, name: 'basil' },
      ],
    },
    {
      id: 2,
      name: 'Pizza #2',
      toppings: [
        { id: 1, name: 'onion' },
        { id: 2, name: 'mushroom' },
        { id: 3, name: 'basil' },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        PizzasService,
        fromEffects.PizzasEffects,
        provideMockActions(() => actions$),
      ],
    });

    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(PizzasService);
    effects = TestBed.inject(fromEffects.PizzasEffects);

    spyOn(service, 'getPizzas').and.returnValue(of(pizzas));
    spyOn(service, 'createPizza').and.returnValue(of(pizzas[0]));
    spyOn(service, 'updatePizza').and.returnValue(of(pizzas[0]));
    spyOn(service, 'removePizza').and.returnValue(of(pizzas[0]));
  });

  describe('loadPizzas$', () => {
    it('should return a collection from LoadPizzasSuccess', () => {
      const action = fromActions.loadPizzas();
      const completion = fromActions.loadPizzasSuccess({ pizzas });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadPizzas$).toBeObservable(expected);
    });
  });

  describe('createPizza$', () => {
    it('should work', () => {
      const action = fromActions.createPizza({ pizza: pizzas[0] });
      const completion = fromActions.createPizzaSuccess({ pizza: pizzas[0] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.createPizza$).toBeObservable(expected);
    });
  });

  describe('updatePizza$', () => {
    it('should work', () => {
      const action = fromActions.updatePizza({ pizza: pizzas[0] });
      const completion = fromActions.updatePizzaSuccess({ pizza: pizzas[0] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.updatePizza$).toBeObservable(expected);
    });
  });

  describe('removePizza$', () => {
    it('should work', () => {
      const action = fromActions.removePizza({ pizza: pizzas[0] });
      const completion = fromActions.removePizzaSuccess({ pizza: pizzas[0] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-c', { c: completion });

      expect(effects.removePizza$).toBeObservable(expected);
    });
  });
});
