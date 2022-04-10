import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { finalize } from 'rxjs/operators';
import { GeneratedCode, GTemplateGroup, ParamInfo, ParamRqInfo } from 'src/app/core/models/models';
import { ToolsService } from 'src/app/core/services/api';


@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss']
})
export class CodeGeneratorComponent implements OnInit {

  results: GeneratedCode[];
  templates: GTemplateGroup[];

  formData: ParamRqInfo = { selectedTmpIds: [], options: {} };

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


  objToMap(obj) {
    const convMap = {};
    for (let k of Object.keys(obj)) {
      convMap[k] = obj[k];
    }
    return convMap;
  }

  onSubmit(form) {
    // console.log(form.value);

    console.log(this.formData);
// console.log(this.objToMap(this.formData.options));
    // let map = new Map<string, string>()
    // for (var value in this.formData.options) {
    //   map.set(value, this.formData.options[value])
    // }

    // const result: Map<string,any> =;

    let paramInfo: ParamInfo = {
      input: this.formData.input,
      selectedTmpIds: this.formData.selectedTmpIds,
      options: this.objToMap(this.formData.options)
    };

  

    this.ngxUiLoader.start();
    this.toolsService.generateCode(paramInfo).pipe(finalize(() => {
      this.ngxUiLoader.stop();
    })).subscribe(result => {
      console.log(result);
      this.results = result?.data;
    }, err => {
      console.log(err);
    });
  }
}
