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
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';

class PagedClientRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './select-client-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class SelectClientDialogComponent extends PagedListingComponentBase<ClientDto> {
   dataSource: ClientDto[] = [];
//   keyword = '';
keyword ='';
clients: ClientDto[]
   isActive: boolean | null;
   advancedFiltersVisible = false;
client: ClientDto;

  constructor(
    injector: Injector,
    private _ClientsService: ClientsServiceProxy,
    private _modalService: BsModalService,
    private _modalRef: BsModalRef
  ) {
    
    super(injector);
    
  }
   ngOnInit(): void {
   //this.list();
   this.refresh();
   console.log(this.client.address)
}


   list(
    request: PagedClientRequestDto,
    pageNumber: number,
    finishedCallback: Function
   ):void{
    request.keyword = this.keyword;
    this._ClientsService
       .getClientListPaged(
        request.keyword,
        request.isActive,
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
         this.clients = result.items;
         //this.totalItems = this.clients.length;
         this.showPaging(result, pageNumber)
       });
   }
   clearFilters(): void {
     this.keyword = '';
     this.isActive = undefined;
     this.getDataPage(1);
   }
delete(): void {
  
}
chooseClient(client){
  // this.client.name=client.name
  this.client.init(client)
  this._modalRef.hide()
}

}