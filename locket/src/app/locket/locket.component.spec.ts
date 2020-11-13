import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocketComponent } from './locket.component';

describe('LocketComponent', () => {
  let component: LocketComponent;
  let fixture: ComponentFixture<LocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
