import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: 'product-item.component.html',
  styleUrls: ['product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualize$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(
    private store: Store<fromStore.ProductsState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pizza$ = this.activatedRoute.params.pipe(
      switchMap((params) => {
        return this.store
          .select(fromStore.getSelectedPizza({ pizzaId: params.pizzaId }))
          .pipe(
            tap((pizza: Pizza = null) => {
              const pizzaExists = !!(pizza && pizza.toppings);
              const toppings = pizzaExists
                ? pizza.toppings.map((topping) => topping.id)
                : [];
              this.store.dispatch(fromStore.visualizeToppings({ toppings }));
              this.visualize$ = this.store.select(
                fromStore.getPizzaVisualized({ pizzaId: params.pizzaId })
              );
            })
          );
      })
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
  }

  onSelect(toppings: number[]) {
    this.store.dispatch(fromStore.visualizeToppings({ toppings }));
  }

  onCreate(pizza: Pizza) {
    this.store.dispatch(fromStore.createPizza({ pizza }));
  }

  onUpdate(pizza: Pizza) {
    this.store.dispatch(fromStore.updatePizza({ pizza }));
  }

  onRemove(pizza: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(fromStore.removePizza({ pizza }));
    }
  }
}
