import { Component, Injector } from '@angular/core';
import { finalize, throwIfEmpty } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  ProductsServiceProxy,
  ProductDto,
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './select-product-transfer-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class SelectProductTransferDialogComponent extends PagedListingComponentBase<ProductDto> {
   dataSource: ProductDto[] = [];
//   keyword = '';
keyword ='';
products: ProductDto[]
//   isActive: boolean | null;
//   advancedFiltersVisible = false;
product: ProductDto;

  constructor(
    injector: Injector,
    private _ProductsService: ProductsServiceProxy,
    private _modalService: BsModalService,
    private _modalRef: BsModalRef
  ) {
    
    super(injector);
    
  }
   ngOnInit(): void {
   //this.list();
   this.refresh();
   console.log(this.product.quantity)
}


   list(
    request: PagedProductRequestDto,
    pageNumber: number,
    finishedCallback: Function
   ):void{
    request.keyword = this.keyword;
    this._ProductsService
       .getProductListPaged(
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
         this.products = result.items;
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
selectProduct(product){
  // this.client.name=client.name
  this.product.init(product)
  this._modalRef.hide()
}

}