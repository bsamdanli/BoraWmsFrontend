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
  ClientDto,
  ClientsServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-client-dialog.component.html'
})
export class CreateClientDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  client: ClientDto = new ClientDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _clientService: ClientsServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    //this.client.isActive = true;
  }

  save(): void {
    this.saving = true;
    this._clientService.createClient(this.client).subscribe(
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