import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'currency-footer',
  templateUrl: './currency-footer.component.html',
  styleUrl: './currency-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyFooterComponent {}
