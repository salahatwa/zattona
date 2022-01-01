import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-template-result',
  templateUrl: './template-result.component.html',
  styleUrls: ['./template-result.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TemplateResultComponent implements OnInit {

  @Input() result:any;

  constructor() { }

  ngOnInit(): void {
  }

}
