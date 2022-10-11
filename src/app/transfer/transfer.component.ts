import { Component, Injector } from '@angular/core';
import { finalize, throwIfEmpty } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  MovementServiceProxy,
  StockMovementDto,
  StockMovementReportDto
  //ProductDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';
import { CreateTransferDialogComponent } from './create-transfer-dialog/create-transfer-dialog.component';

import { relativeTimeThreshold } from 'moment';

class PagedMovementRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './transfer.component.html',
  animations: [appModuleAnimation()]
})
export class TransferComponent  extends PagedListingComponentBase<StockMovementReportDto> {
  protected delete(entity: StockMovementReportDto): void {
    throw new Error('Method not implemented.');
  }
  dataSource: StockMovementReportDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _movementService: MovementServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  ngOnInit(): void {
  //this.list();
  this.refresh();
}


  list(
    request: PagedMovementRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ):void{
    request.keyword = this.keyword;
    

    this._movementService
      .getStockMovementListPaged(
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

  

  createTransfer(): void {
    this.showCreateOrEditProductDialog();
  }


  showCreateOrEditProductDialog(id?: number): void {
    let createOrEditProductDialog: BsModalRef;
    if (!id) {
      createOrEditProductDialog = this._modalService.show(
        CreateTransferDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    // } else {
    //   createOrEditProductDialog = this._modalService.show(
    //     EditProductDialogComponent,
    //     {
    //       class: 'modal-lg',
    //       initialState: {
    //         id: id,
    //       },
    //     }
    //   );
    // }

    createOrEditProductDialog.content.onSave?.subscribe(() => {
      this.refresh();
    });
  }
}

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  

  
  

}
