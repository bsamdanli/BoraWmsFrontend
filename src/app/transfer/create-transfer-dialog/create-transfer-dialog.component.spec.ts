import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransferDialogComponent } from './create-transfer-dialog.component';

describe('CreateTransferDialogComponent', () => {
  let component: CreateTransferDialogComponent;
  let fixture: ComponentFixture<CreateTransferDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransferDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransferDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
