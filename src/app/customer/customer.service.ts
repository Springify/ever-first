import { Customer } from './../model/customer';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormArray, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class CustomerService {

  customerDetails: FormGroup;
  presentAddress: FormGroup;
  permanentAddress: FormGroup;
  previousAddress: FormGroup;
  pensionMember: FormGroup;
  private dependents: BehaviorSubject<FormArray>;
  dependents$: Observable<FormArray>;

  nameRegex = '[a-zA-zñ\\- ]*';
  numericRegex = '[0-9]*';
  alphaNumericRegex = '[a-zA-Z0-9ñ,.\\- ]*';

  constructor(private formBuilder: FormBuilder) {
    this.customerDetails = this.initCustomerDetailsForm();
    this.presentAddress = this.initAddressForm();
    this.permanentAddress = this.initAddressForm();
    this.previousAddress = this.initAddressForm();
    this.pensionMember = this.initPensionMemberForm();
    this.dependents = new BehaviorSubject(new FormArray([]));
    this.dependents$ = this.dependents.asObservable();
  }

  initCustomerDetailsForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      middleName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      suffix: ['', [Validators.pattern('[a-zA-z.]*')]],
      birthDate: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(this.numericRegex)]],
      otherContactNumber: [''],
      pensionSource: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      pensionType: ['', [Validators.required, Validators.pattern('[a-zA-zñ() ]*')]]
    });
  }

  initAddressForm(): FormGroup {
    return this.formBuilder.group({
      unitNumber: ['', [Validators.required, Validators.pattern(this.alphaNumericRegex)]],
      location: ['', [Validators.required, Validators.pattern(this.alphaNumericRegex)]],
      city: ['', [Validators.required, Validators.pattern(this.alphaNumericRegex)]],
      region: ['', [Validators.required, Validators.pattern(this.alphaNumericRegex)]]
    });
  }

  initPensionMemberForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      middleName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      suffix: ['', [Validators.pattern('[a-zA-z.]*')]],
      memberBirthDate: ['', [Validators.required]],
      bank: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      branch: ['', [Validators.required, Validators.pattern(this.alphaNumericRegex)]],
      accountNumber: ['', [Validators.required, Validators.pattern(this.numericRegex)]],
      remittanceDate: ['', [Validators.required]],
      modePension: ['', [Validators.required, Validators.pattern(this.nameRegex)]]
    });
  }

  getErrorMessage(formControl: AbstractControl): string {
    if (formControl.hasError('pattern')) {
      return 'Invalid input';
    }

    return 'Required';
  }

  setCustomerToPensionMember() {
    this.pensionMember.patchValue({
      firstName: this.customerDetails.controls.firstName.value,
      middleName: this.customerDetails.controls.middleName.value,
      lastName: this.customerDetails.controls.lastName.value,
      suffix: this.customerDetails.controls.suffix.value,
      memberBirthDate: this.customerDetails.controls.birthDate.value
    });
  }

  addDependent() {
    const currentDependents = this.dependents.getValue();
    currentDependents.push(this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      middleName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      suffix: ['', [Validators.pattern('[a-zA-z.]*')]],
      dependentBirthDate: ['', [Validators.required]],
      civilStatus: ['', [Validators.required, Validators.pattern(this.nameRegex)]],
      occupation: ['', [Validators.required, Validators.pattern(this.nameRegex)]]
    }));
    this.dependents.next(currentDependents);
  }

  removeDependent(index: number) {
    const currentDependents = this.dependents.getValue();
    currentDependents.removeAt(index);
    this.dependents.next(currentDependents);
  }

  getCustomer(): Customer {
    const customer: Customer = this.customerDetails.getRawValue();
    customer.presentAddress = this.presentAddress.getRawValue();
    customer.permanentAddress = this.permanentAddress.getRawValue();
    customer.previousAddress = this.previousAddress.getRawValue();
    customer.pensionMember = this.pensionMember.getRawValue();
    customer.dependents = this.dependents.getValue().getRawValue();

    return customer;
  }
}
