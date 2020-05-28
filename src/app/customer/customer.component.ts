import { StoreService } from './../service/store.service';
import { CustomerService } from './customer.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import uid from 'uid';

import { SubSink } from 'subsink';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new SubSink();

  showContainer: boolean;
  title: string;
  customer: Customer;
  key: string;

  customerDetailsForm: FormGroup;
  presentAddressForm: FormGroup;
  permanentAddressForm: FormGroup;
  previousAddressForm: FormGroup;
  pensionMemberForm: FormGroup;
  dependentsForm: FormArray;

  isSameForPermanentAddress: boolean;
  isSameForPreviousAddress: boolean;
  isSameForPensionMember: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private customerService: CustomerService,
              private mediaObserver: MediaObserver,
              private storeService: StoreService) { }

  async ngOnInit() {
    this.subs.add(this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      if (change[0].mqAlias !== 'xs') {
        this.showContainer = true;
      } else {
        this.showContainer = false;
      }
    }));

    this.subs.add(this.activatedRoute.params.subscribe(param => {
      if (param.action === 'create') {
          this.title = 'Create Customer';
      } else {
        this.getCustomer(param.action);
        this.title = 'Update Customer';
      }
    }));

    this.customerDetailsForm = this.customerService.customerDetails;
    this.presentAddressForm = this.customerService.presentAddress;
    this.permanentAddressForm = this.customerService.permanentAddress;
    this.previousAddressForm = this.customerService.previousAddress;
    this.pensionMemberForm = this.customerService.pensionMember;
    this.subs.add(this.customerService.dependents$.subscribe(dependent => this.dependentsForm = dependent));
  }

  async ngAfterViewInit() {
    this.subs.add(this.presentAddressForm.valueChanges.subscribe(addressForm => {
      if (this.isSameForPermanentAddress) {
        this.permanentAddressForm.setValue(addressForm);
      }

      if (this.isSameForPreviousAddress) {
        this.previousAddressForm.setValue(addressForm);
      }
    }));

    this.subs.add(this.customerDetailsForm.valueChanges.subscribe(customerDetails => {
      if (this.isSameForPensionMember) {
        this.customerService.setCustomerToPensionMember();
      }
    }));

    console.log(this.subs);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    console.log(this.subs);
  }

  goBack(){
    window.history.back();
    this.reset();
  }

  getErrorMessage(formControl: AbstractControl): string {
    return this.customerService.getErrorMessage(formControl);
  }

  async getCustomer(key: string) {
    this.key = key;
    this.customer = JSON.parse(await this.storeService.getItem(key));
    this.customerService.setCustomer(this.customer);
  }

  sameAsPresentAddress(event: MatCheckboxChange, addressForm: FormGroup) {
    if (event.checked) {
      addressForm.setValue(this.presentAddressForm.value);
      addressForm.disable();
    } else {
      addressForm.reset();
      addressForm.enable();
    }
  }

  sameAsCustomer(event: MatCheckboxChange) {
    const firstName = this.pensionMemberForm.controls.firstName;
    const middleName = this.pensionMemberForm.controls.middleName;
    const lastName = this.pensionMemberForm.controls.lastName;
    const suffix = this.pensionMemberForm.controls.suffix;
    const memberBirthDate = this.pensionMemberForm.controls.memberBirthDate;

    if (event.checked) {
      this.customerService.setCustomerToPensionMember();

      firstName.disable();
      middleName.disable();
      lastName.disable();
      suffix.disable();
      memberBirthDate.disable();
    } else {
      firstName.reset();
      middleName.reset();
      lastName.reset();
      suffix.reset();
      memberBirthDate.reset();

      firstName.enable();
      middleName.enable();
      lastName.enable();
      suffix.enable();
      memberBirthDate.enable();
    }
  }

  addDependent() {
    this.customerService.addDependent();
  }

  removeDependent(index: number) {
    this.customerService.removeDependent(index);
  }

  async showTerms() {
    if (this.key) {
      await this.storeService.setItem(this.key, JSON.stringify(this.customerService.getCustomer()));
    } else {
      await this.storeService.setItem(uid(), JSON.stringify(this.customerService.getCustomer()));
    }
    console.log('Success');
    this.reset();
    this.goBack();
  }

  reset() {
    this.customerDetailsForm.reset();
    this.presentAddressForm.reset();
    this.permanentAddressForm.reset();
    this.previousAddressForm.reset();
    this.pensionMemberForm.reset();
    this.dependentsForm.clear();
  }
}
