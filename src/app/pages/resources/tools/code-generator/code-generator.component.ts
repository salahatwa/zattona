import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneratedCode, GTemplateGroup } from 'src/app/core/models/models';
import { ToolsService } from 'src/app/core/services/api';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss']
})
export class CodeGeneratorComponent implements OnInit {

  results: GeneratedCode[];
  templates: GTemplateGroup[];

  constructor(private toolsService: ToolsService,
    private ngxUiLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates() {
    this.ngxUiLoader.start();
    this.toolsService.listGeneratorTmp().pipe(finalize(() => {
      this.ngxUiLoader.stop();
    })).subscribe(data => {
      this.templates = data.data;
      console.log(this.templates);
    }, err => {
      console.log(err);
    });
  }


  onSubmit(form) {
    console.log(form.value);
    // form.value.selectedTmpIds = ['30', '31', '32', '72', '96', '98'];
    form.value.options = {};
    this.ngxUiLoader.start();
    this.toolsService.generateCode(form.value).pipe(finalize(() => {
      this.ngxUiLoader.stop();
    })).subscribe(result => {
      console.log(result);
      this.results = result?.data;
    }, err => {
      console.log(err);
    });
  }
}
