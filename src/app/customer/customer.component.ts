import { CustomerService } from './customer.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

import { SubSink } from 'subsink';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new SubSink();

  showContainer: boolean;
  title: string;

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
              private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
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
      }

    }));

    this.customerDetailsForm = this.customerService.customerDetails;
    this.presentAddressForm = this.customerService.presentAddress;
    this.permanentAddressForm = this.customerService.permanentAddress;
    this.previousAddressForm = this.customerService.previousAddress;
    this.pensionMemberForm = this.customerService.pensionMember;
    this.subs.add(this.customerService.dependents$.subscribe(dependent => this.dependentsForm = dependent));
  }

  ngAfterViewInit(): void {
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
  }

  getErrorMessage(formControl: AbstractControl): string {
    return this.customerService.getErrorMessage(formControl);
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

  showTerms() {
    console.log(this.customerService.getCustomer());
  }
}