import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerItemComponent } from './ticker-item.component';

describe('TickerItemComponent', () => {
  let component: TickerItemComponent;
  let fixture: ComponentFixture<TickerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TickerItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
