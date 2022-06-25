import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserCardComponent } from './add-user-card.component';

describe('AddUserCardComponent', () => {
  let component: AddUserCardComponent;
  let fixture: ComponentFixture<AddUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
