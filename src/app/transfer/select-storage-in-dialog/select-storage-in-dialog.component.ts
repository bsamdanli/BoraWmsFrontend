import { Component, Injector } from '@angular/core';
import { finalize, throwIfEmpty } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  StorageServiceProxy,
  StorageDto,
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';

class PagedStorageRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './select-storage-in-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class SelectStorageInDialogComponent extends PagedListingComponentBase<StorageDto> {
   dataSource: StorageDto[] = [];
//   keyword = '';
keyword ='';
storages: StorageDto[]
//   isActive: boolean | null;
//   advancedFiltersVisible = false;
storage: StorageDto;

  constructor(
    injector: Injector,
    private _StorageService: StorageServiceProxy,
    private _modalService: BsModalService,
    private _modalRef: BsModalRef
  ) {
    
    super(injector);
    
  }
   ngOnInit(): void {
   //this.list();
   this.refresh();
   console.log(this.storage.name)
}


   list(
    request: PagedStorageRequestDto,
    pageNumber: number,
    finishedCallback: Function
   ):void{
    request.keyword = this.keyword;
    this._StorageService
       .getStorageListPaged(
        request.keyword,
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
         this.storages = result.items;
         //this.totalItems = this.clients.length;
         this.showPaging(result, pageNumber)
       });
   }
   clearFilters(): void {
     this.keyword = '';
    // this.isActive = undefined;
     this.getDataPage(1);
   }
delete(): void {
  
}
selectStorage(storage){
  // this.client.name=client.name
  this.storage.init(storage)
  this._modalRef.hide()
}

}