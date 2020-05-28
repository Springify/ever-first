import { ExcelService } from './../service/excel.service';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';
import { HomeComponent } from './home.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoanCalculatorComponent } from './loan-calculator/loan-calculator.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoanCalculatorComponent,
    CustomerInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaskModule.forRoot()
  ],
  providers: [TitleCasePipe, DatePipe, ExcelService]
})
export class HomeModule { }
