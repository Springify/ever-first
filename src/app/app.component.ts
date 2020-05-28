import { StoreService } from './service/store.service';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'EverFirst';

  constructor(private storeService: StoreService) { }

  async ngAfterViewInit() {
    await this.storeService.init();
    await this.storeService.openStore();
  }
}
