import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';

@Component({
  selector: 'abp-pagination-controls',
  templateUrl: './abp-pagination-controls.component.html'
})
export class AbpPaginationControlsComponent {

  @Input() id: string;
  @Input() maxSize = 7;
  @Input() previousLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Input() screenReaderPaginationLabel = 'Pagination';
  @Input() screenReaderPageLabel = 'page';
  @Input() screenReaderCurrentLabel = `You're on page`;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild ("p") p:PaginationControlsDirective;
  private _directionLinks = true;
  private _autoHide = false;
  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }
  set directionLinks(value: boolean) {
    this._directionLinks = !!value && <any>value !== 'false';
  }
  @Input()
  get autoHide(): boolean {
    return this._autoHide;
  }
  set autoHide(value: boolean) {
    this._autoHide = !!value && <any>value !== 'false';
  }
  a(p){
    console.log(p);
  }
}
