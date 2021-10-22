import { Component, Input } from '@angular/core';

@Component({
  selector: 'pizza-item',
  templateUrl: 'pizza-item.component.html',
  styleUrls: ['pizza-item.component.scss'],
})
export class PizzaItemComponent {
  @Input() pizza: any;
}
