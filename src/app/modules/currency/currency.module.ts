import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyComponent } from './currency.component';
import { CurrencyHeaderComponent } from './components/currency-header/currency-header.component';
import { CurrencyContentComponent } from './components/currency-content/currency-content.component';
import { CurrencyFooterComponent } from './components/currency-footer/currency-footer.component';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyResolver } from './resolvers/currency.resolver';
import { OnlyNumberDirective } from './directives/only-number.directive';

@NgModule({
  declarations: [
    CurrencyComponent,
    CurrencyFooterComponent,
    CurrencyContentComponent,
    CurrencyHeaderComponent,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CurrencyRoutingModule
  ],
  providers: [
    CurrencyResolver,
    DecimalPipe
  ]
})
export class CurrencyModule {}
