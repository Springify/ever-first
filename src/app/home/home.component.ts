import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('customerTab')
  customerTab: MatTab;

  constructor() { }

  ngOnInit(): void {
  }
}
