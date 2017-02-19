import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-status',
  templateUrl: './home-status.component.html',
  styleUrls: ['./home-status.component.scss']
})
export class HomeStatusComponent implements OnInit {

  myDate: Date;
  constructor() { }

  ngOnInit() {
    this.myDate = new Date();
  }

}