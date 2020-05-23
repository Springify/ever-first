import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addressForm = this.formBuilder.group({
      unitNumber: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

}
