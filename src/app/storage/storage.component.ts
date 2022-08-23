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
import { CreateStorageDialogComponent } from './create-storage-dialog/create-storage-dialog.component';
import { EditStorageDialogComponent } from './edit-storage-dialog/edit-storage-dialog.component';
import { relativeTimeThreshold } from 'moment';

class PagedStorageRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './storage.component.html',
  animations: [appModuleAnimation()]
})
export class StorageComponent extends PagedListingComponentBase<StorageDto> {
  dataSource: StorageDto[] = [];
  keyword: '';
  advancedFiltersVisible = false;
 

  constructor(
    injector: Injector,
    private _storageService: StorageServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedStorageRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ):void{
    request.keyword = this.keyword;

    this._storageService
      .getStorageListPaged(
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
  
  delete(storage: StorageDto): void {
    abp.message.confirm(
      this.l(storage.name + 'İsimli Müşteri Silinecektir', storage.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._storageService
            .deleteStorage(storage.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                //this.refresh();
                
              })
            )
            .subscribe(() => {
            });
        }
      }
    );
  }

  createStorage(): void {
    this.showCreateOrEditStorageDialog();
  }

  editStorage(storage: StorageDto): void {
    this.showCreateOrEditStorageDialog(storage.id);
  }

  showCreateOrEditStorageDialog(id?: number): void {
    let createOrEditStorageDialog: BsModalRef;
    if (!id) {
      createOrEditStorageDialog = this._modalService.show(
        CreateStorageDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditStorageDialog = this._modalService.show(
        EditStorageDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditStorageDialog.content.onSave.subscribe(() => {
      this.refresh();
      });
  }

  clearFilters(): void {
    this.keyword = '';
    //this.isActive = undefined;
    this.getDataPage(1);
  }
}