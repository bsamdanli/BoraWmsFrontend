import { Component, Injector, ViewChild } from '@angular/core';
import { finalize, throwIfEmpty } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  StorageServiceProxy,
  ClientDto,
  ReceivingDto,
  ProductDto,
  StorageDto,
  StockMovementDto,
  MovementServiceProxy,
  TransferMovementDto,
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';
import { SelectStorageOutDialogComponent } from '../select-storage-out-dialog/select-storage-out-dialog.component';
import { SelectStorageInDialogComponent } from '../select-storage-in-dialog/select-storage-in-dialog.component';
import { SelectProductTransferDialogComponent } from '../select-product-transfer-dialog/select-product-transfer-dialog.component';
import { createViewChild } from '@angular/compiler/src/core';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './create-transfer-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class CreateTransferDialogComponent extends PagedListingComponentBase<StorageDto> {
  dataSource: StorageDto[] = [];
  // stockMovementOut: StockMovementDto= new StockMovementDto();
  // stockMovementIn: StockMovementDto= new StockMovementDto();
  transfer: TransferMovementDto= new TransferMovementDto();
  storageIn: StorageDto= new StorageDto();
  storageOut: StorageDto= new StorageDto();
  products: ProductDto[] = [];
  product: ProductDto= new ProductDto();
  keyword = '';
  saving = false;
  isActive: boolean | null;
  advancedFiltersVisible = false;
  // receiving: ReceivingDto= new ReceivingDto();
  quantityInput: number;
  constructor(
    injector: Injector,
    private _StorageService: StorageServiceProxy,
    private _modalService: BsModalService,
    public _movementService: MovementServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    
  //this.list();
  this.refresh();
}


  list(
    
  )
  {
    
    this._StorageService
      .getStorageAll(
        
      )
       .pipe(
         finalize(() => {
          this.isTableLoading = false;
         })
       )
        
      
      .subscribe(result => {
        this.dataSource = result;
        this.totalItems = this.dataSource.length;
      });
  }

  delete(){
    
  }
  save(){
    this.transfer.storageInId= this.storageIn.id
    this.transfer.storageOutId= this.storageOut.id
    this.transfer.productId= this.product.id
    this.transfer.quantity= this.quantityInput

    this._movementService.createTransferMovement(this.transfer).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        
        this.saving = false;
        this.bsModalRef.hide();
        //this.ngOnInit();
        
      }
    );

  }
  
  selectStorageOut(): void {
    this.showSelectStorageOutDialog();
  }

  showSelectStorageOutDialog(id?: number): void {
 
    let showSelectStorageDialog: BsModalRef;
    if (!id) {
      showSelectStorageDialog = this._modalService.show(
        SelectStorageOutDialogComponent,
        {
          class: 'modal-lg',
          initialState: {storage:this.storageOut}

        }
      );
    } 

    showSelectStorageDialog.content.onSave?.subscribe(() => {
      //this.refresh();
      this.list();
    });
  }

  selectStorageIn(): void {
    this.showSelectStorageInDialog();
  }

  showSelectStorageInDialog(id?: number): void {
 
    let showSelectStorageDialog: BsModalRef;
    if (!id) {
      showSelectStorageDialog = this._modalService.show(
        SelectStorageInDialogComponent,
        {
          class: 'modal-lg',
          initialState: {storage:this.storageIn}

        }
      );
    } 

    showSelectStorageDialog?.content?.onSave?.subscribe(() => {
      //this.refresh();
      this.list();
    });
  }

  selectProduct(): void {
    this.showSelectProductDocumentDialog();
  }

  showSelectProductDocumentDialog(id?: number): void {
 
    let createOrEditProductDocumentDialog: BsModalRef;
    if (!id) {
      createOrEditProductDocumentDialog = this._modalService.show(
        SelectProductTransferDialogComponent,
        {
          class: 'modal-lg',
          initialState: {product:this.product}

        }
      );
    } 

    createOrEditProductDocumentDialog.content?.onSave?.subscribe(() => {
      //this.refresh();
      this.list();
    });
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  
  

}