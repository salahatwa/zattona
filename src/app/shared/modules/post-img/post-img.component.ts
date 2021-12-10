import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-img',
  templateUrl: './post-img.component.html',
  styleUrls: ['./post-img.component.scss']
})
export class PostImgComponent implements OnInit {

  defaultImage:string='./assets/images/Insights_guy.png';

  @Input() post: any;

  constructor() { }

  ngOnInit(): void {
  }

}
