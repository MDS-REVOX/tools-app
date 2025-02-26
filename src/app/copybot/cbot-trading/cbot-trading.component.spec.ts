import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbotTradingComponent } from './cbot-trading.component';

describe('CbotTradingComponent', () => {
  let component: CbotTradingComponent;
  let fixture: ComponentFixture<CbotTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbotTradingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbotTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
