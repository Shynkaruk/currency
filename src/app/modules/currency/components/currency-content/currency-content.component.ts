import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { Currency, CurrencyResponse } from '../../models';
import { map, switchMap } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'currency-content',
  templateUrl: './currency-content.component.html',
  styleUrl: './currency-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyContentComponent implements OnInit {
  public currencies: string[] = [
    Currency.USD,
    Currency.EUR,
    Currency.UAH
  ];
  public currencyForm: FormGroup;
  public currencyRates;
  public currentRate: number;

  get getBaseCurrencyCurrency(): string {
    return this.currencyForm.controls['baseCurrencyCurrency'].value;
  }

  get getBaseCurrencyAmount(): string {
    return this.currencyForm.controls['baseCurrencyAmount'].value;
  }

  get getConvertedToCurrency(): string {
    return this.currencyForm.controls['convertedToCurrency'].value;
  }

  get getConvertedToAmount(): string {
    return this.currencyForm.controls['convertedToAmount'].value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private decimalPipe :DecimalPipe
    ) {}

  public ngOnInit(): void {
    this.setCurrencyRates();
    this.buildCurrencyForm();
    this.currencyFormValuesChanges();
  }

  private setCurrencyRates(): void {
    this.currencyRates = this.route.snapshot.data['currencyRate'];
    this.currentRate = this.currencyRates?.usd;
  }

  private buildCurrencyForm(): void {
    this.currencyForm =  this.formBuilder.group({
      baseCurrencyAmount: this.formBuilder.control({ value: 1, disabled: false }),
      baseCurrencyCurrency: this.formBuilder.control({ value: Currency.USD, disabled: false }),
      convertedToAmount: this.formBuilder.control({ value: this.currencyRates?.usd, disabled: false }),
      convertedToCurrency: this.formBuilder.control({ value: Currency.UAH, disabled: false }),
    });
  }

  private currencyFormValuesChanges(): void {
    this.setFormControlBaseCurrencyAmount();
    this.setFormControlBaseCurrencyCurrency();
    this.setFormControlConvertedToAmount();
    this.setFormControlConvertedToCurrency();
  }

  private setFormControlBaseCurrencyAmount(): void {
    this.currencyForm.controls['baseCurrencyAmount'].valueChanges
      .pipe(map(value => this.currentRate * Number(value)))
      .subscribe(value => {
        this.setInputValue('convertedToAmount', value);
      })
  }

  private setFormControlBaseCurrencyCurrency(): void {
    this.currencyForm.controls['baseCurrencyCurrency'].valueChanges
      .pipe(
        switchMap((_) =>
          this.currencyService.getCurrenсy(this.getBaseCurrencyCurrency, this.getConvertedToCurrency)
        ),
        map((currency: CurrencyResponse) => {
          this.currentRate = Number(currency.value);
          const amount = this.removeCommas(this.getBaseCurrencyAmount);

          return Number(amount) * this.currentRate;
        })
      )
      .subscribe(value => {
        this.setInputValue('convertedToAmount', value);
      })
  }

  private setFormControlConvertedToAmount(): void {
    this.currencyForm.controls['convertedToAmount'].valueChanges
      .pipe(map(value => Number(value) / this.currentRate))
      .subscribe(value => {
        this.setInputValue('baseCurrencyAmount', value);
      })
  }

  private setFormControlConvertedToCurrency(): void {
    this.currencyForm.controls['convertedToCurrency'].valueChanges
      .pipe(
        switchMap((_) =>
          this.currencyService.getCurrenсy(this.getBaseCurrencyCurrency, this.getConvertedToCurrency)
        ),
        map((currency: CurrencyResponse) => {
          this.currentRate = Number(currency.value);
          const amount = this.removeCommas(this.getConvertedToAmount);

          return Number(amount) / this.currentRate;
        })
      )
      .subscribe(value => {
        this.setInputValue('baseCurrencyAmount', value);
      })
  }

  private setInputValue(formName: string, value: number): void {
    this.currencyForm.controls[formName]
      .patchValue(this.decimalPipe.transform(value, '1.2-2'), { emitEvent: false });
  }

  private removeCommas(value: string): string {
    return value.replace(/(,)/g, '');
  }
}

