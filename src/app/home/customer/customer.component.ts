import { DependentComponent } from './../dependent/dependent.component';
import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  title: string;
  customerDetails: FormGroup;
  presentAddress: FormGroup;
  permanentAddress: FormGroup;
  previousAddress: FormGroup;
  pensionMemberData: FormGroup;

  sameAsPresentForPermanentAddress: boolean;
  sameAsPresentForPreviousAddress: boolean;
  sameAsCustomer: boolean;

  @ViewChild('dependentContainer', { read : ViewContainerRef})
  dependentContainer: ViewContainerRef;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.subs.add(this.route.params.subscribe(param => this.title = param['action']));

    this.customerDetails = this.formBuilder.group({
      firstName: ['Lorenzo Iraj', Validators.required],
      middleName: ['Lañas', Validators.required],
      lastName: ['Mendoza', Validators.required],
      suffix: [''],
      birthDate: ['', Validators.required],
      contactNumber: ['09562684212', Validators.required],
      otherContactNumber: [''],
      pensionSource: ['SSS', [Validators.required]],
      pensionType: ['Employment Compensation (EC)', [Validators.required]]
    });

    this.subs.add(this.customerDetails.valueChanges.subscribe(e => {
      if (this.sameAsCustomer) {
        this.pensionMemberData.controls['firstName'].setValue(this.customerDetails.controls['firstName'].value);
        this.pensionMemberData.controls['middleName'].setValue(this.customerDetails.controls['middleName'].value);
        this.pensionMemberData.controls['lastName'].setValue(this.customerDetails.controls['lastName'].value);
        this.pensionMemberData.controls['suffix'].setValue(this.customerDetails.controls['suffix'].value);
        this.pensionMemberData.controls['memberBirthDate'].setValue(this.customerDetails.controls['birthDate'].value);
      }
    }));

    this.presentAddress = this.initializeAddressForm();
    this.permanentAddress = this.initializeAddressForm();
    this.previousAddress = this.initializeAddressForm();

    this.subs.add(this.presentAddress.valueChanges.subscribe(e => {
      if (this.sameAsPresentForPermanentAddress) {
        this.permanentAddress.setValue(e);
      }

      if (this.sameAsPresentForPreviousAddress) {
        this.previousAddress.setValue(e);
      }
    }));

    this.pensionMemberData = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      suffix: [''],
      memberBirthDate: ['', Validators.required],
      bank: ['', Validators.required],
      branch: ['', Validators.required],
      accountNumber: ['', Validators.required],
      remittanceDate: ['', Validators.required],
      modePension: [null, Validators.required]
    });
  }

  initializeAddressForm(): FormGroup {
    return this.formBuilder.group({
      unitNumber: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  sameAsPresent(addressFormGroup: FormGroup, sameAsPresent: boolean) {
    if (sameAsPresent) {
      addressFormGroup.setValue(this.presentAddress.value);
      addressFormGroup.disable();
    } else {
      addressFormGroup.reset();
      addressFormGroup.enable();
    }
  }

  sameAsCustomerVoid(sameAsClient: boolean) {
    if (sameAsClient) {
      this.pensionMemberData.controls['firstName'].setValue(this.customerDetails.controls['firstName'].value);
      this.pensionMemberData.controls['middleName'].setValue(this.customerDetails.controls['middleName'].value);
      this.pensionMemberData.controls['lastName'].setValue(this.customerDetails.controls['lastName'].value);
      this.pensionMemberData.controls['suffix'].setValue(this.customerDetails.controls['suffix'].value);
      this.pensionMemberData.controls['memberBirthDate'].setValue(this.customerDetails.controls['birthDate'].value);

      this.pensionMemberData.controls['firstName'].disable();
      this.pensionMemberData.controls['middleName'].disable();
      this.pensionMemberData.controls['lastName'].disable();
      this.pensionMemberData.controls['suffix'].disable();
      this.pensionMemberData.controls['memberBirthDate'].disable();
    } else {
      this.pensionMemberData.controls['firstName'].reset();
      this.pensionMemberData.controls['middleName'].reset();
      this.pensionMemberData.controls['lastName'].reset();
      this.pensionMemberData.controls['suffix'].reset();
      this.pensionMemberData.controls['memberBirthDate'].reset();


      this.pensionMemberData.controls['firstName'].enable();
      this.pensionMemberData.controls['middleName'].enable();
      this.pensionMemberData.controls['lastName'].enable();
      this.pensionMemberData.controls['suffix'].enable();
      this.pensionMemberData.controls['memberBirthDate'].enable();
    }
  }

  addDependent() {
    const factory = this.resolver.resolveComponentFactory(DependentComponent);
    const ref = this.dependentContainer.createComponent(factory);
    ref.instance.componentRef = ref;
  }
}
