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
  //ProductDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { relativeTimeThreshold } from 'moment';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './product.component.html',
  animations: [appModuleAnimation()]
})
export class ProductComponent extends PagedListingComponentBase<ProductDto> {
  dataSource: ProductDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _productsService: ProductsServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  ngOnInit(): void {
  //this.list();
  this.refresh();
}


  list(
    request: PagedProductRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ):void{
    request.keyword = this.keyword;
    

    this._productsService
      .getProductListPaged(
        request.keyword,
        request.skipCount,
        request.maxResultCount
      )
       .pipe(
         finalize(() => {
          finishedCallback();
         })
       ) 
        
      
      .subscribe(result => {
        this.dataSource = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(product: ProductDto): void {
    abp.message.confirm(
      this.l(product.name + 'İsimli Müşteri Silinecektir', product.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._productsService
            .deleteProduct(product.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
                
              })
            )
            .subscribe(() => {
            });
        }
      }
    );
  }

  createProduct(): void {
    this.showCreateOrEditProductDialog();
  }

  editProduct(product: ProductDto): void {
    this.showCreateOrEditProductDialog(product.id);
  }

  showCreateOrEditProductDialog(id?: number): void {
    let createOrEditProductDialog: BsModalRef;
    if (!id) {
      createOrEditProductDialog = this._modalService.show(
        CreateProductDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditProductDialog = this._modalService.show(
        EditProductDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditProductDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  

  
  

}