import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button'; 

import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import {
  ClientDto, ClientsServiceProxy
} from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CreateClientDialogComponent } from './create-client-dialog/create-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';


class PagedClientRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './client.component.html',
  animations: [appModuleAnimation()]
})
export class ClientComponent extends PagedListingComponentBase<ClientDto> {
  dataSource: ClientDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  // pageSizeLocal = this.pageSize;
  // pageSizeOptionLocal = this.pageSizeOption;

  constructor(
    injector: Injector,
    private _clientService: ClientsServiceProxy,
    private _modalService: BsModalService,
    private _dialog: MatDialog
  ) {
    super(injector);
  }
// list(
//   request: PagedClientRequestDto,
//   pageNumber: number,
//   finishedCallback: Function
// ): void {
//   request.keyword = this.keyword;
//   request.isActive = this.isActive;

//   this._clientService
//       .getClientAll(
//       ).pipe(
//         finalize(() => {
//           finishedCallback();
//         })
//       ).subscribe(result => {
//         this.dataSource = result
//         this.totalItems = this.dataSource.length;
//         this.showPaging(null, pageNumber);
//       });
// }
  list(
    request: PagedClientRequestDto,
    pageNumber: number,
    finishedCallback: Function
    ): void {
      request.keyword= this.keyword;
      request.isActive = this.isActive;
     
      this._clientService
      .getClientListPaged(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      ).pipe(
        finalize(() => {
          finishedCallback()
        })
      )
      .subscribe(result => {
        this.dataSource = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  delete(client: ClientDto): void {
    abp.message.confirm(
      this.l(client.name + 'İsimli Müşteri Silinecektir', client.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._clientService
            .deleteClient(client.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                //this.refresh();
                
              })
            )
            .subscribe(() => {
              this.refresh();
            });
        }
      }
    );
  }

  createClient(): void {
    this.showCreateOrEditClientDialog();
  }

  editClient(client: ClientDto): void {
    this.showCreateOrEditClientDialog(client.id);
  }

  showCreateOrEditClientDialog(id?: number): void {
    let createOrEditClientDialog: BsModalRef;
    if (!id) {
      createOrEditClientDialog = this._modalService.show(
        CreateClientDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditClientDialog = this._modalService.show(
        EditClientDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditClientDialog.content.onSave.subscribe(() => {
      this.refresh();
      //this.list();
    });
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  
  

}
