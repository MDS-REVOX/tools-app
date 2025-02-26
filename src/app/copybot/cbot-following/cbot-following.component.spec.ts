import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbotfollowingComponent } from './cbot-following.component';

describe('CbotFollowingComponent', () => {
  let component: CbotfollowingComponent;
  let fixture: ComponentFixture<CbotfollowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CbotfollowingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CbotfollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
