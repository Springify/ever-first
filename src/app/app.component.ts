import { SubSink } from 'subsink';
import { StoreService } from './service/store.service';
import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'EverFirst';
  loading = false;

  private subs = new SubSink();

  constructor(private storeService: StoreService, private router: Router) {
    this.subs.add(this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    }));
  }

  async ngAfterViewInit() {
    await this.storeService.init();
    await this.storeService.openStore();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
