import { CustomerService } from './../customer.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input()
  addressForm: FormGroup;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  getErrorMessage(formControl: AbstractControl) {
    return this.customerService.getErrorMessage(formControl);
  }

}
