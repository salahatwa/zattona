import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toolbox: any = [
    {
      category: "Development Tools",
      data: [
        {
          title: "Code Generator",
          description: "Generate any code using JSON",
          link: "/resources/tools/code-generator"
        }
      ]
    },
    {
      category: "WEB Tools",
      data: [
        {
          title: "QR Generator",
          description: "Generate REAL TIME QR ",
          link: "/resources/tools/qr-generator"
        }
        ,{
          title: "Get IP details",
          description: "Get Ip details geo location",
          link: "/resources/tools/ip-details"
        }
      ]
    }
    ,

  ];




}
