import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyComponent {}
