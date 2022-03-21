import { Component, Injector, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { isPlatformBrowser } from "@angular/common";
import { OauthService, UserService } from "../../core/services/api";
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { finalize } from "rxjs/operators";
import { GitConfig } from "src/app/pages/login/login.const";
import { Ouath, GithubUser, Repo } from "src/app/core/models/models";

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

  repos: Repo[] = [];

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

              // this.outhService.getRepos(this.user).subscribe(data => {
              //   this.repos = data?.data;
              // });
              this.outhService.createSite(this.user).subscribe();



            },
            err => {
              console.log(err);
            }
          );


      }
    );
  }




  selectedRepo;

  selected() {
    this.ngxUiLoader.start();
    this.outhService.deleteRepo(this.user, this.selectedRepo?.name).pipe(finalize(() => {
      this.ngxUiLoader.stop();
    })).subscribe(data => {
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