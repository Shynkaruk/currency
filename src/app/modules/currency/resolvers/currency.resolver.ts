import { CurrencyService} from '../services/currency.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CurrencyResolver {
  constructor(
    private currencyService: CurrencyService
  ) {}

  public resolve(): Observable<any> {
    return forkJoin([
      this.currencyService.getCurrenсy('USD', 'UAH'),
      this.currencyService.getCurrenсy('EUR', 'UAH')
    ])
      .pipe(
        map(([usdRate, eurRate]) => {
          if (!usdRate || !eurRate) {
            return null;
          }

          return {
            [usdRate.source.toLowerCase()]: usdRate.value,
            [eurRate.source.toLowerCase()]: eurRate.value
          };
        }),
        catchError(() => of(null))
      );
  }
}
