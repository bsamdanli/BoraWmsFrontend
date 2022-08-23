import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  StorageDto,
  StorageServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-storage-dialog.component.html'
})
export class CreateStorageDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  storage: StorageDto = new StorageDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _storageService: StorageServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    //this.client.isActive = true;
  }

  save(): void {
    this.saving = true;
    this._storageService.createStorage(this.storage).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        
        this.saving = false;
        this.bsModalRef.hide();
        //this.ngOnInit();
        this.onSave.emit();

      }
    );
  }
}