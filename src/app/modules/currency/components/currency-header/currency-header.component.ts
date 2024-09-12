import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'currency-header',
  templateUrl: './currency-header.component.html',
  styleUrl: './currency-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyHeaderComponent implements OnInit {
     public currencyRates;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.currencyRates = this.route.snapshot.data['currencyRate'];
  }
}
