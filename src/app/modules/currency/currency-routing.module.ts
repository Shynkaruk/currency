import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyComponent } from './currency.component';
import { CurrencyResolver } from './resolvers/currency.resolver';

const routes = [
  {
    path: '',
    component: CurrencyComponent,
    resolve: {
      currencyRate: CurrencyResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule{}
