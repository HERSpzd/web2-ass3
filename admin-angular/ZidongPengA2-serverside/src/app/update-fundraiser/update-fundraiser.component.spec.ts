import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFundraiserComponent } from './update-fundraiser.component';

describe('UpdateFundraiserComponent', () => {
  let component: UpdateFundraiserComponent;
  let fixture: ComponentFixture<UpdateFundraiserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateFundraiserComponent]
    });
    fixture = TestBed.createComponent(UpdateFundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
