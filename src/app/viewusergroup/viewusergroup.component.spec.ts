import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewusergroupComponent } from './viewusergroup.component';

describe('ViewusergroupComponent', () => {
  let component: ViewusergroupComponent;
  let fixture: ComponentFixture<ViewusergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewusergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewusergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
