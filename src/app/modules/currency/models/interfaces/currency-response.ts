import { Currency } from '../enums';

export interface CurrencyResponse {
  source: Currency;
  target: Currency;
  value: string;
  time: number;
}
