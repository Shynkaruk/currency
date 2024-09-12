import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CURRENCY_API, CurrencyResponse } from '../models';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) {}

  public getCurrenсy(source: string, target: string): Observable<CurrencyResponse> {
    const params = new HttpParams()
      .set('source', source)
      .set('target', target)
      .set('length', 1)

    return this.httpClient
      .get<CurrencyResponse[]>(CURRENCY_API, { params })
      .pipe(
        map(response => response[0]),
        catchError(_ => of(null))
      )
  }
}
