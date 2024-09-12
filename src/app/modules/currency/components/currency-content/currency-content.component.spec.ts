import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyContentComponent } from './currency-content.component';

describe('CurrencyContentComponent', () => {
  let component: CurrencyContentComponent;
  let fixture: ComponentFixture<CurrencyContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
