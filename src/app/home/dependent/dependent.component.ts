import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewContainerRef, ComponentRef } from '@angular/core';

@Component({
  selector: 'dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.scss']
})
export class DependentComponent implements OnInit {

  @Input()
  componentRef: ComponentRef<DependentComponent>;

  dependentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dependentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      suffix: [''],
      dependentBirthDate: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      occupation: ['', [Validators.required]]
    });
  }

  remove() {
    this.componentRef.destroy();
  }
}
