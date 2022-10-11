import { Component, Injector } from '@angular/core';
import { finalize, throwIfEmpty } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  ClientsServiceProxy,
  ClientDto,
  DocumentDetailDto,
  ReceivingServiceProxy,
  ReceivingDto,
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';
import { timeStamp } from 'console';

class PagedDocumentDetailRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './document-detail-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class DocumentDetailDialogComponent extends PagedListingComponentBase<DocumentDetailDto> {
   dataSource: DocumentDetailDto[] = [];
   document: ReceivingDto;
   id;
//   keyword = '';
keyword ='';
documentDetails: DocumentDetailDto[] = []; // sil
   
   advancedFiltersVisible = false;
   isCompleted = false;

  constructor(
    injector: Injector,
    private _receivingService: ReceivingServiceProxy,
    private _modalService: BsModalService,
    private _modalRef: BsModalRef
  ) {
    super(injector);
  }
   list(
    request: PagedDocumentDetailRequestDto,
    pageNumber: number,
    finishedCallback: Function
   ):void{
    request.keyword = this.keyword;
    this._receivingService
       .getDocumentDetailListPaged(
        request.keyword,
        //request.isActive,
        request.skipCount,
        request.maxResultCount,
        this.id
       )
        .pipe(
          finalize(() => {
            finishedCallback();
           //this.isTableLoading = false;
          })
        )
        
      
       .subscribe(result => {
         this.dataSource = result.items;
         this.showPaging(result, pageNumber)
         this.check()
       });
   }
   clearFilters(): void {
     this.keyword = '';
     //this.isActive = undefined;
     this.getDataPage(1);
   }

complete(id): void{
  this._receivingService.completeDocumentDetail(id).subscribe(()=> {
    this.dataSource.forEach((detail) => {
      if(detail.id === id) {
        detail.isCompleted = true;
      }
    })
    this.check();
  })
  
}

deleteDocumentDetail(id) {
  this._receivingService.deleteDocumentDetail(id).subscribe(() => {
    this.dataSource.forEach((detail) => {
      if(detail.id === id) {
        detail.isDeleted = true;
      }
    })
    this.check();
  })
}

check(){
  for(let i = 0 ; i<this.dataSource.length; i++)
  {
    if(!(this.dataSource[i].isCompleted||this.dataSource[i].isDeleted))
    {
     return this.isCompleted= false; 
    }
  }
  return this.isCompleted= true;
}

save(){
this._receivingService.completeDocument(this.id).subscribe(()=>{
  this._modalRef.hide();
  this.isCompleted=true;
  this.document.isCompleted=true;
})
}

delete(): void {
  
}


}