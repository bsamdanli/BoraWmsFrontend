
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
  ReceivingDto,
  ProductDto,
  TransferMovementDto,
  DocumentDetailDto,
  ReceivingServiceProxy,
  //ClientDtoPagedResultDto,
} from '@shared/service-proxies/service-proxies';

import { relativeTimeThreshold } from 'moment';
import { SelectClientDialogComponent } from '../select-client-dialog/select-client-dialog.component';
import { SelectProductDialogComponent } from '../select-product-dialog/select-product-dialog.component';
import { defaultMaxListeners } from 'events';
import { DeclarationListEmitMode } from '@angular/compiler';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './create-document-dialog.component.html',
  animations: [appModuleAnimation()]
})
export class CreateDocumentDialogComponent extends PagedListingComponentBase<ClientDto> {
  dataSource: ClientDto[] = [];
  client: ClientDto= new ClientDto();
  choosenProducts: ProductDto[] = [];
  stocks : Number [] = []
  product: ProductDto= new ProductDto();
  transfer: TransferMovementDto= new TransferMovementDto();
  transfers: TransferMovementDto[] = [];
  keyword = '';
  saving = false;
  isActive: boolean | null;
  advancedFiltersVisible = false;
  receiving: ReceivingDto= new ReceivingDto();
  

  constructor(
    injector: Injector,
    private _ClientsService: ClientsServiceProxy,
    private _ReceivingService: ReceivingServiceProxy,
    private _modalService: BsModalService,
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
    
    this._ClientsService
      .getClientAll(
        
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
  save():void
  {
      this.saving = true;
      // this.document.documentHeader.documentDate = new Date(this.documentDate);
      // this.document.documentHeader.registrationDate = new Date(this.registrationDate);
      this.receiving.client = this.client;
      this.receiving.clientId = this.client.id;
      this.receiving.isCompleted = false;
      this._ReceivingService.createReceivingDocument(this.receiving).subscribe(document=> 
      {
        let details: DocumentDetailDto[] = [];
      for (let i = 0; i < this.choosenProducts.length; i++) {
          let detail = new DocumentDetailDto();
          detail.init({
              productId: this.choosenProducts[i].id,
              product: this.choosenProducts[i],
              quantity: this.stocks[i],
              document,
              documentId:document.id,
              isDeleted: false,
              isCompleted: false
          });
          details.push(detail);
      }
      details.forEach(detail=>this._ReceivingService.createReceivingDocumentDetail(detail).subscribe())
      })
      this.bsModalRef.hide()
  }

  selectClient(): void {
    this.showSelectClientDocumentDialog();
  }

  showSelectClientDocumentDialog(id?: number): void {
 
    let createOrEditClientDocumentDialog: BsModalRef;
    if (!id) {
      createOrEditClientDocumentDialog = this._modalService.show(
        SelectClientDialogComponent,
        {
          class: 'modal-lg',
          initialState: {client:this.client}

        }
      );
    } 

    createOrEditClientDocumentDialog.content.onSave?.subscribe(() => {
      //this.refresh();
      this.list();
    });
  }

  selectProduct(): void {
    this.showSelectProductDocumentDialog();
  }

  showSelectProductDocumentDialog(id?: number): void {
  console.log(this.choosenProducts)
  console.log(this.stocks)
    let createOrEditProductDocumentDialog: BsModalRef;
    if (!id) {
      createOrEditProductDocumentDialog = this._modalService.show(
        SelectProductDialogComponent,
        {
          class: 'modal-lg',
          initialState: {selectedProducts:this.choosenProducts ,
          stocks:this.stocks }

        }
      );
    } 

    createOrEditProductDocumentDialog.content.onSave?.subscribe(() => {
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