import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss']
})
export class MainPostComponent implements OnInit {
  varx:boolean = false;
  showadd() {
    this.varx=true;
  }
  hideadd() {
    this.varx=false;
  }
  constructor() { }

  ngOnInit() {
  }

}
