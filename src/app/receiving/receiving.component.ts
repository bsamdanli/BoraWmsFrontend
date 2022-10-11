import { Component, Injector } from '@angular/core';
import { finalize, throwIfEmpty } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  ReceivingServiceProxy,
  ReceivingDto,
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateDocumentDialogComponent } from './create-document-dialog/create-document-dialog.component';
import { EditDocumentDialogComponent } from './edit-document-dialog/edit-document-dialog.component';
import { relativeTimeThreshold } from 'moment';
import { DocumentDetailDialogComponent } from './document-detail-dialog/document-detail-dialog.component';
import { threadId } from 'worker_threads';

class PagedReceivingRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './receiving.component.html',
  animations: [appModuleAnimation()]
})
export class ReceivingComponent extends PagedListingComponentBase<ReceivingDto> {
  dataSource: ReceivingDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _receivingService: ReceivingServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  ngOnInit(): void {
  //this.list();
  this.refresh();
}


  list(
    request: PagedReceivingRequestDto,
    pageNumber: number,
    finishedCallback: Function
  )
  {
    request.keyword = this.keyword;
    this._receivingService
      .getDocumentAll(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
       .pipe(
         finalize(() => {
          this.isTableLoading = false;
          finishedCallback()
         })
       )
        
      
      .subscribe(result => {
        this.dataSource = result.items;
        this.totalItems = result.totalCount;
        this.showPaging(result, pageNumber);
      });
  }

  delete(document: ReceivingDto): void {
    abp.message.confirm(
      this.l(document.documentNo + 'İsimli Müşteri Silinecektir', document.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this._receivingService
            .deleteDocument(document.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                //this.refresh();
                
              })
            )
            .subscribe(() => {
              //this.list();
              this.refresh();
            });
        }
      }
    );
  }


  documentDetail(id): void {
    this.showDocumentDetailDialog(id);
  }

  showDocumentDetailDialog(id?: number): void {
 
    let createOrEditDocumentDetailDialog: BsModalRef;
    if (id) {
      let document;
      this.dataSource.forEach(el=>{
        if(el.id===id )
        {
          document=el
        }
      })

      createOrEditDocumentDetailDialog = this._modalService.show(
        DocumentDetailDialogComponent,
        {
          class: 'modal-lg',
          initialState: {id,document}

        }
      );
    } 

    createOrEditDocumentDetailDialog.content.onSave?.subscribe(() => {
      this.refresh();
      //this.list();
    });
  }


  createReceivingDocument(): void {
    this.showCreateOrEditReceivingDocumentDialog();
  }

  editDocument(receiving: ReceivingDto): void {
    this.showCreateOrEditReceivingDocumentDialog(receiving.id);
  }

  showCreateOrEditReceivingDocumentDialog(id?: number): void {
    let createOrEditReceivingDocumentDialog: BsModalRef;
    if (!id) {
      createOrEditReceivingDocumentDialog = this._modalService.show(
        CreateDocumentDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditReceivingDocumentDialog = this._modalService.show(
        EditDocumentDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditReceivingDocumentDialog.content.onSave?.subscribe(() => {
      this.refresh();
      //this.list();
    });
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }
deleteDocument(id): void {
  this._receivingService.deleteDocument(id).subscribe(() => {
    this.dataSource.forEach((el, index) => {
      if (el.id === id) {
        this.dataSource[index].isDeleted = true;
        this.dataSource.splice(index, 1);
      }
    })
  })

}
  
  

}