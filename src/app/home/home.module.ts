import { NumericDirective } from './../directive/numeric.directive';
import { AlphaNumericDirective } from '../directive/alphanumeric.directive';
import { NameDirective } from './../directive/name.directive';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { HomeComponent } from './home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';
import { DependentComponent } from './dependent/dependent.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    HomeComponent,
    CustomerComponent,
    NameDirective,
    AlphaNumericDirective,
    NumericDirective,
    DependentComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatStepperModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
    MatTabsModule
  ],
  providers: [TitleCasePipe]
})
export class HomeModule { }
