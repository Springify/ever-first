import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dependent',
  templateUrl: './dependent.component.html',
  styleUrls: ['./dependent.component.scss']
})
export class DependentComponent implements OnInit {

  @Input()
  componentRef: ComponentRef<DependentComponent>;
  @Input()
  dependentDetails: FormGroup;
  dependentForm: FormGroup;
  id: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = uuidv4();
    this.dependentForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      suffix: [''],
      dependentBirthDate: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      occupation: ['', [Validators.required]]
    });
    this.dependentDetails.addControl(this.id, this.dependentForm);
  }

  remove() {
    this.dependentDetails.removeControl(this.id);
    this.componentRef.destroy();
  }
}
