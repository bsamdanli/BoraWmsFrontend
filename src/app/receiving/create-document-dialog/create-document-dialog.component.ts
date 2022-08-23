import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ClientDto,
  ClientsServiceProxy,
  ReceivingDto,
  ReceivingServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  templateUrl: 'create-document-dialog.component.html'
})
export class CreateDocumentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  myControl = new FormControl();
  receiving: ReceivingDto = new ReceivingDto();
  clientList : ClientDto[]=[];
  filteredOptions: Observable<ClientDto[]>;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _receivingService: ReceivingServiceProxy,
    private _clientService :ClientsServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    let res1 = this._clientService.getClientAll();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.clientList.slice())
      );
   
  }
  displayFn(user: any): string {
    return user && user.name ? user.name : '';}

    private _filter(name: string): ClientDto[] {
      const filterValue = name.toLowerCase();
  
      return this.clientList.filter(option => option.name.toLowerCase().includes(filterValue));
    }  

  save(): void {
    this.saving = true;
    this._receivingService.createReceivingDocument(this.receiving).subscribe(
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