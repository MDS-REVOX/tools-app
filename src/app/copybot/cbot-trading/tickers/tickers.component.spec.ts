import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickersComponent } from './tickers.component';

describe('TickersComponent', () => {
  let component: TickersComponent;
  let fixture: ComponentFixture<TickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
