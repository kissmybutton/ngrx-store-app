import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pizza } from './products/models/pizza.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const pizzas = [
      {
        name: "Blazin' Inferno",
        toppings: [
          {
            id: 12,
            name: 'tomato',
          },
          {
            id: 4,
            name: 'chili',
          },
          {
            id: 10,
            name: 'pepperoni',
          },
          {
            id: 9,
            name: 'pepper',
          },
          {
            id: 5,
            name: 'mozzarella',
          },
          {
            id: 3,
            name: 'basil',
          },
          {
            id: 8,
            name: 'onion',
          },
        ],
        id: 1,
      },
      {
        name: "Plain Ol' Pepperoni",
        toppings: [
          {
            id: 10,
            name: 'pepperoni',
          },
        ],
        id: 3,
      },
    ];
    const toppings = [
      {
        id: 1,
        name: 'anchovy',
      },
      {
        id: 2,
        name: 'bacon',
      },
      {
        id: 3,
        name: 'basil',
      },
      {
        id: 4,
        name: 'chili',
      },
      {
        id: 5,
        name: 'mozzarella',
      },
      {
        id: 6,
        name: 'mushroom',
      },
      {
        id: 7,
        name: 'olive',
      },
      {
        id: 8,
        name: 'onion',
      },
      {
        id: 9,
        name: 'pepper',
      },
      {
        id: 10,
        name: 'pepperoni',
      },
      {
        id: 11,
        name: 'sweetcorn',
      },
      {
        id: 12,
        name: 'tomato',
      },
    ];

    return { pizzas, toppings };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(pizzas: Pizza[]): number {
    return pizzas.length > 0
      ? Math.max(...pizzas.map((pizza) => pizza.id)) + 1
      : 11;
  }
}
