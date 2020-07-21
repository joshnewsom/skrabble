import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankTileDialogComponent } from './blank-tile-dialog.component';

describe('BlankTileDialogComponent', () => {
  let component: BlankTileDialogComponent;
  let fixture: ComponentFixture<BlankTileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankTileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankTileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
