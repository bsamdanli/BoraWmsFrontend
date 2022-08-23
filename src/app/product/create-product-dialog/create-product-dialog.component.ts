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
  ProductDto,
  ProductsServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-product-dialog.component.html'
})
export class CreateProductDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  product: ProductDto = new ProductDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _productsService: ProductsServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    //this.client.isActive = true;
  }

  save(): void {
    this.saving = true;
    this._productsService.createProduct(this.product).subscribe(
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