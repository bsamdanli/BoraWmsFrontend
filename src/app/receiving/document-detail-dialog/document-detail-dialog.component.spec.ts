import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailDialogComponent } from './document-detail-dialog.component';

describe('DocumentDetailDialogComponent', () => {
  let component: DocumentDetailDialogComponent;
  let fixture: ComponentFixture<DocumentDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
