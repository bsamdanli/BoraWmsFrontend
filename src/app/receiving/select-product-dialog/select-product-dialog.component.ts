import { Component, Injector, ViewChild } from '@angular/core';
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
  TransferMovementDto,
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';
import { identifierModuleUrl } from '@angular/compiler';
import { createViewChild } from '@angular/compiler/src/core';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './select-product-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class SelectProductDialogComponent extends PagedListingComponentBase<ProductDto> {
   dataSource: ProductDto[] = [];
//   keyword = '';
keyword ='';
selectedProducts: ProductDto[] = [];
stocks: Number[] = [];
//@ViewChild("quantity") quantity
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
   //console.log(this.product.quantity)
}
finish(){}
  //  finish(){
  //   console.log(this.quantityInput)
  //   this.quantityInput.forEach(element => {
  //     this.choosenProductsQuantity.push(element)
  //   });
    
    
  //   this._modalRef.hide()
  // }


   list(
    request: PagedProductRequestDto,
    pageNumber: number,
    finishedCallback: Function
   ):void{
    request.keyword = this.keyword;
    this._ProductsService.getProductListForSearchPaged(
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
         this.dataSource = result.items;
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
chooseProduct(product,quantity):void 
{
  // const newproduct= new SelectedProductDto()
  // newproduct.init(product)
  // newproduct.selectedQuantity=quantity
  
  console.log(quantity.value)
  if(this.selectedProducts.find(p=> p.id===product.id))
  {
    const index = this.selectedProducts.findIndex(p=> p.id===product.id)
    this.selectedProducts.splice(index, 1)
    this.stocks.splice(index, 1)
  }
  else
  {
    this.selectedProducts.push(product)
    this.stocks.push(quantity.value)
  }
  console.log(this.selectedProducts)

}
save(): void
{
  this._modalRef.hide()
}

checkIfInclude(product)
{
return this.selectedProducts.some(p=> p.id===product.id)
}
updateInput(product)
{
if(this.checkIfInclude(product))
{
  
 return this.stocks[this.selectedProducts.findIndex(p=>p.id===product.id)]

}
}
checkIfDisabled(quantity)
{
  return quantity.value===undefined||quantity.value===null||quantity.value===0|| quantity.value===""
}

}