import { Component, Injector, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { isPlatformBrowser } from "@angular/common";
import { OauthService, UserService } from "../../core/services/api";
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { GitConfig } from "src/app/pages/login/login.const";
import { Ouath, GithubUser } from "src/app/core/models/models";

@Component({
  selector: "app-git-tools",
  templateUrl: "./git-tools.component.html",
  styleUrls: ["./git-tools.component.scss"],
})
export class GitToolsComponent implements OnInit {
  platformId: any;

  responseText: any = "";
  token: any = "";

  user: GithubUser;

  constructor(private outhService: OauthService, private route: ActivatedRoute, private httpClient: HttpClient, private ngxUiLoader: NgxUiLoaderService, handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  ngOnInit(): void {
    this.ngxUiLoader.start();

    this.route.queryParams.subscribe(
      (params: Params) => {
        console.log(params?.code);



        this.outhService.authorize(params?.code)
          .pipe(finalize(() => {
            this.ngxUiLoader.stop();
          })).subscribe(
            (value) => {
              console.log(value?.data);
              this.user = value?.data;

              const headersConfig = {

              };
              // 
              headersConfig['Accept'] = `application/vnd.github.v3+json`;
              headersConfig['Authorization'] = `token ` + value?.data?.access_token;

              this.httpClient.get<any>('https://api.github.com/user/repos?type=public&sort=created&per_page=100', { headers: headersConfig }).subscribe((data) => {
                console.log(data);
                this.repos = data;
              });

              // 
              // this.httpClient.get<any>('https://api.github.com/user/orgs',{headers:headersConfig}).subscribe((data)=>{

              // console.log(data);
              // });

              // this.httpClient.post<any>('https://api.github.com/user/repos',{
              //   name: 'Cloud_Hosting2030'
              // },{headers:headersConfig}).subscribe((data)=>{

              //   // https://api.github.com/user/repos
              // console.log(data);
              // });



            },
            err => {
              console.log(err);
            }
          );

        // Authorization
        // this.httpClient.get('https://api.github.com/user',{headers:headersConfig})
        //   .pipe(finalize(() => {
        //     this.ngxUiLoader.stop();
        //   })).subscribe(
        //     (value: any) => {
        //       console.log(value);
        //     },
        //     err => {
        //       console.log(err);
        //     }
        //   );



      }
    );
  }


  repos: [] = [];

  selectedRepo;

  selected() {
    // console.log(this.selectedRepo);
    const headersConfig = {

    };
    headersConfig['Accept'] = `application/vnd.github.v3+json`;
    headersConfig['Authorization'] = `token ` + this.user?.access_token;
    // headersConfig['X-OAuth-Scopes'] = `repo, user`;
    // headersConfig['X-Accepted-OAuth-Scopes'] = `repo,user`;
    // headersConfig[''] = ``;

 
    //Check if it's github page return 404 
    // this.httpClient.get<any>('https://api.github.com/repos/'+this.user?.login+'/'+this.selectedRepo?.name+'/pages', { headers: headersConfig }).subscribe((data) => {
    //   console.log(data);
    // });

    let source = { "source": { "branch": "master", "path": "/docs" } };
    this.httpClient.post<any>('https://api.github.com/repos/' + this.user?.login + '/' + this.selectedRepo?.name + '/pages', source, { headers: headersConfig }).subscribe((data) => {
      console.log(data);
    });
  }


}

const generateExternalLink = (
  type: ExternalLinkType,
  content: any,
  config: UserConfigInfoModel
  // eslint-disable-next-line consistent-return
): string => {
  const cdnLink: string = `https://cdn.jsdelivr.net/gh/${config.owner}/${config.selectedRepos}@${config.selectedBranch}/${content.path}`
  const ghLink: string = decodeURI(content.download_url)

  // eslint-disable-next-line default-case
  switch (type) {
    case ExternalLinkType.gh:
      return ghLink

    case ExternalLinkType.md_gh:
      return `![${getFilename(content.name)}](${ghLink})`

    case ExternalLinkType.cdn:
      return cdnLink

    case ExternalLinkType.md_cdn:
      return `![${getFilename(content.name)}](${cdnLink})`
  }
}

/**
 * get filename
 * @param filename
 */
export const getFilename = (filename: string) => {
  const splitIndex = filename.indexOf('.')
  return filename.substr(0, splitIndex).trim().replace(/\s+/g, '-')
}

export enum ExternalLinkType {
  gh = 'gh',
  md_gh = 'md_gh',
  cdn = 'cdn',
  md_cdn = 'md_cdn'
}


export interface UserConfigInfoModel {
  token: string
  owner: string
  email: string
  name: string
  avatarUrl: string
  selectedRepos: string
  // reposList: ReposModel[]
  selectedBranch: string
  // branchMode: BranchModeEnum
  // branchList: BranchModel[]
  // dirMode: DirModeEnum
  selectedDir: string
  selectedDirList: string[]
  // dirList: DirModel[]
  loggingStatus: boolean
}