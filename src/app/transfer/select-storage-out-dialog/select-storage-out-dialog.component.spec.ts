import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStorageOutDialogComponent } from './select-storage-out-dialog.component';

describe('SelectStorageOutDialogComponent', () => {
  let component: SelectStorageOutDialogComponent;
  let fixture: ComponentFixture<SelectStorageOutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStorageOutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStorageOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
