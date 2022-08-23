import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatDocumentDialogComponent } from './creat-document-dialog.component';

describe('CreatDocumentDialogComponent', () => {
  let component: CreatDocumentDialogComponent;
  let fixture: ComponentFixture<CreatDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
