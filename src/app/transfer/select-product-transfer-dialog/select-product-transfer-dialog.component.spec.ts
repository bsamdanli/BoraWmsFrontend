import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductTransferDialogComponent } from './select-product-transfer-dialog.component';

describe('SelectProductTransferDialogComponent', () => {
  let component: SelectProductTransferDialogComponent;
  let fixture: ComponentFixture<SelectProductTransferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductTransferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductTransferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
