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
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';

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
//   keyword = '';
keyword ='';
documentDetail: DocumentDetailDto[]
   
   advancedFiltersVisible = false;

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
        request.maxResultCount
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
       });
   }
   clearFilters(): void {
     this.keyword = '';
     //this.isActive = undefined;
     this.getDataPage(1);
   }
delete(): void {
  
}


}