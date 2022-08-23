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
  StorageServiceProxy,
  StorageDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'edit-storage-dialog.component.html'
})
export class EditStorageDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  storage: StorageDto = new StorageDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _storageService: StorageServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._storageService.getStorage(this.id).subscribe((result: StorageDto) => {
      this.storage = result;
    });
  }

  save(): void {
    this.saving = true;

    this._storageService.updateStorage(this.storage).subscribe(
      () => {
        this.notify.info(this.l('Kayıt Başarılı!'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}