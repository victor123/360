import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditusergroupComponent } from './editusergroup.component';

describe('EditusergroupComponent', () => {
  let component: EditusergroupComponent;
  let fixture: ComponentFixture<EditusergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditusergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditusergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
