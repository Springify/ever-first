import { Customer } from './../../model/customer';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  @Input()
  id: string;
  @Input()
  value: string;
  customer: Customer;
  @Output()
  deleteCustomer: EventEmitter<string> = new EventEmitter();
  @Output()
  exportCustomer: EventEmitter<string> = new EventEmitter();


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.customer = JSON.parse(this.value);
  }

  delete() {
    this.deleteCustomer.emit(this.id);
  }

  export() {
    this.exportCustomer.emit(this.id);
  }

  update() {
    this.router.navigate(['customer', this.id]);
  }

}
