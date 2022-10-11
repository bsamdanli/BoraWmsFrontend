import { Component, OnInit,Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase, PagedRequestDto,
} from 'shared/paged-listing-component-base';
import { MovementServiceProxy, ProductsServiceProxy, StockDto } from '@shared/service-proxies/service-proxies';
import { StorageServiceProxy }  from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';

@Component({
  selector: 'app-stocks',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent extends PagedListingComponentBase<StockDto> implements OnInit{
  
  protected delete(entity: StockDto): void {
    throw new Error('Method not implemented.');
  }
  dataSource: StockDto [] = []
  keyword = '';
    isActive: boolean | null;

    storageId: any;
    productId: any;

    products:any;
    storages:any;

    displayedColumns = ["storagename","productname","stockquantity"];

    constructor(
      injector: Injector,
      private _movementService: MovementServiceProxy, 
      private _storageService: StorageServiceProxy,
      private _productsService: ProductsServiceProxy,
      private _dialog: MatDialog
  ) {
      super(injector);
  }
     ngOnInit(): void {
         this._storageService.getStorageAll()
         .subscribe(result=> {
          this.storages= result
         });
         this._productsService.getProductAll()
          .subscribe(result=>{
            this.products=result
          });
         
         
     }

    list() {
    this._movementService. getStockQuantity(this.storageId, this.productId)
      .subscribe(result => {
        this.dataSource = result
      });
    }

}
