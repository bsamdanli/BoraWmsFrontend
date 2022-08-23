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
  ClientsServiceProxy,
  ClientDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'edit-client-dialog.component.html'
})
export class EditClientDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  client: ClientDto = new ClientDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _clientsService: ClientsServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._clientsService.getClient(this.id).subscribe((result: ClientDto) => {
      this.client = result;
    });
  }

  save(): void {
    this.saving = true;

    this._clientsService.updateClient(this.client).subscribe(
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