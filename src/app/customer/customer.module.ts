import { CustomerRoutingModule } from './customer-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { CustomerComponent } from './customer.component';
import { AddressComponent } from './address/address.component';
import { DependentComponent } from './dependent/dependent.component';

import { NameDirective } from '../directive/name.directive';
import { NumericDirective } from '../directive/numeric.directive';
import { AlphaNumericDirective } from '../directive/alphanumeric.directive';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';

import { NgxMaskModule } from 'ngx-mask';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    CustomerComponent,
    AddressComponent,
    DependentComponent,
    NameDirective,
    NumericDirective,
    AlphaNumericDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomerRoutingModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot()
  ],
  providers: [TitleCasePipe]
})
export class CustomerModule { }
