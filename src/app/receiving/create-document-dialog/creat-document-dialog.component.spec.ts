import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentDialogComponent } from './create-document-dialog.component';

describe('CreatDocumentDialogComponent', () => {
  let component: CreateDocumentDialogComponent;
  let fixture: ComponentFixture<CreateDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
