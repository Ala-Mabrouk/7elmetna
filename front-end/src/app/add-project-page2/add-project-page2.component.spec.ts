import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectPage2Component } from './add-project-page2.component';

describe('AddProjectPage2Component', () => {
  let component: AddProjectPage2Component;
  let fixture: ComponentFixture<AddProjectPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectPage2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
