import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeStrategyComponent } from './make-strategy.component';

describe('MakeStrategyComponent', () => {
  let component: MakeStrategyComponent;
  let fixture: ComponentFixture<MakeStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
