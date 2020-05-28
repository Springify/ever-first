import { CustomerService } from './../customer.service';
import { Component, OnInit, Input, ComponentRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependentComponent implements OnInit {

  // @Input()
  // componentRef: ComponentRef<DependentComponent>;

  @Input()
  dependentForm: FormGroup;
  @Input()
  index: number;
  @Output()
  removeDependent: EventEmitter<number> = new EventEmitter();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void { }

  remove() {
    this.removeDependent.emit(this.index);
  }

  getErrorMessage(formControl: AbstractControl): string {
    return this.customerService.getErrorMessage(formControl);
  }

}
