import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeLinesComponent } from './trade-lines.component';

describe('TradeLinesComponent', () => {
  let component: TradeLinesComponent;
  let fixture: ComponentFixture<TradeLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
