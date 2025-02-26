import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbotAccountComponent } from './cbot-account.component';

describe('CbotAccountComponent', () => {
  let component: CbotAccountComponent;
  let fixture: ComponentFixture<CbotAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbotAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbotAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
