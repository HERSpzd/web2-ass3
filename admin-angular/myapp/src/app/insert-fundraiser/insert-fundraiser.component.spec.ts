import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFundraiserComponent } from './insert-fundraiser.component';

describe('InsertFundraiserComponent', () => {
  let component: InsertFundraiserComponent;
  let fixture: ComponentFixture<InsertFundraiserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertFundraiserComponent]
    });
    fixture = TestBed.createComponent(InsertFundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
