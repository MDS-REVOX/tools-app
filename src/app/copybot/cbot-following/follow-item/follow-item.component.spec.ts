import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowItemComponent } from './follow-item.component';

describe('FollowItemComponent', () => {
  let component: FollowItemComponent;
  let fixture: ComponentFixture<FollowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
