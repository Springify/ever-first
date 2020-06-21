import { DatePipe } from '@angular/common';
import { SubSink } from 'subsink';
import { Term } from './../../model/term';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  fees = {
    processingFee: 290.00,
    serviceFee: 60.00,
    documentStampFee: 0.0075
  };

  loanCalculatorForm: FormGroup;
  endDate = '';
  principalAmount = 0;
  interest = 0;
  processFee = 0;
  serviceFee = 0;
  documentStampFee = 0;
  totalDeduction = 0;
  netProceeds = 0;

  terms: Term[] = [
    { months: 6, rate: 12 },
    { months: 7, rate: 14 },
    { months: 8, rate: 16 },
    { months: 9, rate: 18 },
    { months: 10, rate: 20 },
    { months: 11, rate: 22 },
    { months: 12, rate: 24 },
    { months: 13, rate: 26 },
    { months: 14, rate: 28 },
    { months: 15, rate: 30 },
    { months: 16, rate: 32 },
    { months: 17, rate: 34 },
    { months: 18, rate: 36 },
    { months: 19, rate: 38 },
    { months: 20, rate: 40 },
    { months: 21, rate: 42 },
    { months: 22, rate: 44 },
    { months: 23, rate: 46 },
    { months: 24, rate: 48 }
  ];

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.loanCalculatorForm = this.formBuilder.group({
      numberOfTerms: ['', [Validators.required]],
      monthlyAmortization: ['', [Validators.required]],
      startDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subs.add(this.loanCalculatorForm.valueChanges.subscribe(() => {
      if (this.loanCalculatorForm.valid) {
        const selectedTerm = this.terms.find(term => this.loanCalculatorForm.controls.numberOfTerms.value === term.months);
        const selectedStartDate = new Date(this.loanCalculatorForm.controls.startDate.value);
        const newEndDate = new Date(selectedStartDate.setMonth(selectedStartDate.getMonth() + selectedTerm.months - 1));
        this.endDate = this.datePipe.transform(newEndDate, 'M/d/yyyy');
        this.principalAmount = this.loanCalculatorForm.controls.monthlyAmortization.value * selectedTerm.months;
        this.interest = (selectedTerm.rate / 100) * this.principalAmount;
        this.serviceFee = selectedTerm.months * this.fees.serviceFee;
        this.documentStampFee = this.principalAmount * this.fees.documentStampFee;
        this.totalDeduction = this.interest + this.fees.processingFee + this.serviceFee + this.documentStampFee;
        this.netProceeds = this.principalAmount - this.totalDeduction;
        this.processFee = this.fees.processingFee;
      }
    }));
    console.log(this.subs);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    console.log(this.subs);
  }

}
