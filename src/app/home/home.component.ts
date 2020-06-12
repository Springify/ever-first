import { ExcelService } from './../service/excel.service';
import { SubSink } from 'subsink';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from './../service/store.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { Plugins, AppUrlOpen, registerWebPlugin } from '@capacitor/core';

const { App } = Plugins;
import { FileSharer } from '@byteowls/capacitor-filesharer';

App.addListener('backButton', (data: AppUrlOpen) => App.exitApp());

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  private subs = new SubSink();

  @ViewChild('customerTab')
  customerTab: MatTab;
  @ViewChild('loanCalcTab')
  loanCalcTab: MatTab;

  private customersSubject: BehaviorSubject<any[]>;
  customers$: Observable<any[]>;
  customers = [];

  constructor(private storeService: StoreService, private excelService: ExcelService) { }

  ngOnInit() {
    registerWebPlugin(FileSharer);
  }

  async ngAfterViewInit() {
    await this.storeService.setTable('Customers');
    this.customersSubject = new BehaviorSubject(await this.storeService.getAllKeysValues());
    this.customers$ = this.customersSubject.asObservable();
    this.subs.add(this.customers$.subscribe(customer => this.customers = customer));
  }

  async deleteCustomer(key: string, index: number) {
    const currentCustomers = this.customersSubject.getValue();
    currentCustomers.splice(index, 1);
    await this.storeService.removeItem(key);
    this.customersSubject.next(currentCustomers);
  }

  async exportCustomer(key: string) {
    const customer = JSON.parse(await this.storeService.getItem(key));
    this.excelService.exportToFile(customer);
  }
}
