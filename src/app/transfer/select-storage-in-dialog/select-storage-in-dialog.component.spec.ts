import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStorageInDialogComponent } from './select-storage-in-dialog.component';

describe('SelectStorageInDialogComponent', () => {
  let component: SelectStorageInDialogComponent;
  let fixture: ComponentFixture<SelectStorageInDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStorageInDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStorageInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
