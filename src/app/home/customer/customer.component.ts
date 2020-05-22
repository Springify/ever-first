import { DependentComponent } from './../dependent/dependent.component';
import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { AddressComponent } from '../address/address.component';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {

  private subs = new SubSink();

  showContainer: boolean;
  title: string;
  customerDetails: FormGroup;
  pensionMemberData: FormGroup;

  sameAsPresentForPermanentAddress: boolean;
  sameAsPresentForPreviousAddress: boolean;
  sameAsCustomerForPensionMember: boolean;

  @ViewChild('presentAddress')
  presentAddressComponent: AddressComponent;

  @ViewChild('permanentAddress')
  permanentAddressComponent: AddressComponent;

  @ViewChild('previousAddress')
  previousAddressComponent: AddressComponent;

  @ViewChild('dependentContainer', { read : ViewContainerRef})
  dependentContainer: ViewContainerRef;

  dependentDetails: FormGroup;
  dependentCtr = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private resolver: ComponentFactoryResolver,
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

    this.customerDetails = this.formBuilder.group({
      firstName: ['Lorenzo Iraj', [Validators.required]],
      middleName: ['Lañas', Validators.required],
      lastName: ['Mendoza', Validators.required],
      suffix: [''],
      birthDate: ['', Validators.required],
      contactNumber: ['09562684212', Validators.required],
      otherContactNumber: [''],
      pensionSource: ['SSS', [Validators.required]],
      pensionType: ['Employment Compensation (EC)', [Validators.required]]
    });

    this.pensionMemberData = this.formBuilder.group({
      firstName: ['Lorenzo Iraj', Validators.required],
      middleName: ['Lañas', Validators.required],
      lastName: ['Mendoza', Validators.required],
      suffix: [''],
      memberBirthDate: ['', Validators.required],
      bank: ['BPI', Validators.required],
      branch: ['Marikina', Validators.required],
      accountNumber: ['123', Validators.required],
      remittanceDate: ['', Validators.required],
      modePension: ['ATM', Validators.required]
    });

    this.dependentDetails = this.formBuilder.group({});
  }

  ngAfterViewInit(): void {
    this.subs.add(this.presentAddressComponent.addressForm.valueChanges.subscribe(e => {
      if (this.sameAsPresentForPermanentAddress) {
        this.permanentAddressComponent.addressForm.setValue(e);
      }

      if (this.sameAsPresentForPreviousAddress) {
        this.previousAddressComponent.addressForm.setValue(e);
      }

    }));

    this.subs.add(this.customerDetails.valueChanges.subscribe(e => {
      if (this.sameAsCustomerForPensionMember) {
        this.setCustomerToPensionMember();
      }
    }));
    console.log(this.subs);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    console.log(this.subs);
  }

  sameAsPresent(addressFormGroup: FormGroup, sameAsPresent: boolean) {
    if (sameAsPresent) {
      addressFormGroup.setValue(this.presentAddressComponent.addressForm.value);
      addressFormGroup.disable();
    } else {
      addressFormGroup.reset();
      addressFormGroup.enable();
    }
  }

  sameAsCustomer(sameAsClient: boolean) {
    if (sameAsClient) {
      this.setCustomerToPensionMember();

      this.pensionMemberData.controls.firstName.disable();
      this.pensionMemberData.controls.middleName.disable();
      this.pensionMemberData.controls.lastName.disable();
      this.pensionMemberData.controls.suffix.disable();
      this.pensionMemberData.controls.memberBirthDate.disable();
    } else {
      this.pensionMemberData.controls.firstName.reset();
      this.pensionMemberData.controls.middleName.reset();
      this.pensionMemberData.controls.lastName.reset();
      this.pensionMemberData.controls.suffix.reset();
      this.pensionMemberData.controls.memberBirthDate.reset();

      this.pensionMemberData.controls.firstName.enable();
      this.pensionMemberData.controls.middleName.enable();
      this.pensionMemberData.controls.lastName.enable();
      this.pensionMemberData.controls.suffix.enable();
      this.pensionMemberData.controls.memberBirthDate.enable();
    }
  }

  setCustomerToPensionMember() {
    this.pensionMemberData.controls.firstName.setValue(this.customerDetails.controls.firstName.value);
    this.pensionMemberData.controls.middleName.setValue(this.customerDetails.controls.middleName.value);
    this.pensionMemberData.controls.lastName.setValue(this.customerDetails.controls.lastName.value);
    this.pensionMemberData.controls.suffix.setValue(this.customerDetails.controls.suffix.value);
    this.pensionMemberData.controls.memberBirthDate.setValue(this.customerDetails.controls.birthDate.value);
  }

  addDependent() {
    const factory = this.resolver.resolveComponentFactory(DependentComponent);
    const ref = this.dependentContainer.createComponent(factory);
    ref.instance.componentRef = ref;
    ref.instance.dependentDetails = this.dependentDetails;
  }

  checkDependents() {
    console.log(this.dependentDetails);
  }

  showTerms() {
    console.log(this.customerDetails.value);
    console.log(this.presentAddressComponent.addressForm.value);
    console.log(this.permanentAddressComponent.addressForm.value);
    console.log(this.previousAddressComponent.addressForm.value);
    console.log(this.pensionMemberData.value);
    console.log(this.dependentDetails.value);
    console.log('Show terms');
  }
}
